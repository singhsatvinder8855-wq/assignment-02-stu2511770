## Storage Systems

To meet the hospital network's diverse goals, I selected specific, purpose-built storage systems rather than relying on a single monolithic database. 

For the **first goal** (predicting patient readmission risk), I chose a central **Data Lakehouse** (such as Databricks or AWS S3 + Delta Lake). Machine learning models require massive volumes of historical, structured, and semi-structured treatment data to train effectively. A Lakehouse provides the highly scalable, low-cost storage of a data lake while maintaining the data reliability needed for accurate ML model training.

For the **second goal** (allowing doctors to query patient history in plain English), I implemented a **Vector Database** (like Pinecone or Milvus). Traditional keyword searches fail with complex medical semantics. By generating embeddings of patient histories and doctors' notes, the vector database can perform rapid semantic similarity searches, powering an LLM interface that understands the true context of a doctor's natural language question.

For the **third goal** (generating monthly reports for hospital management), a **Data Warehouse** (like Snowflake or BigQuery) is the optimal choice. It is optimized for complex OLAP aggregations, allowing management to instantly generate dashboards on bed occupancy and department-wise costs without impacting the performance of the hospital's day-to-day operational databases.

For the **fourth goal** (streaming real-time vitals), I selected a **Time-Series Database** (like InfluxDB) paired with a streaming broker like Apache Kafka. Time-series databases are uniquely engineered to ingest millions of high-frequency data points per second—perfect for continuous ICU monitoring—and allow for rapid downsampling and alerting.

## OLTP vs OLAP Boundary

In this architecture, the transactional (OLTP) system ends at the hospital's Electronic Health Records (EHR) PostgreSQL database and the InfluxDB time-series ingestion layer. These systems are optimized for rapid, isolated row-level inserts and updates necessary for active patient care. 

The boundary is defined by the ETL (Extract, Transform, Load) and streaming pipelines (e.g., Apache Airflow or Kafka Connect). These pipelines continuously pull data from the OLTP systems, transform it, and push it into the analytical layer. The analytical (OLAP) system officially begins at the Data Lakehouse and Data Warehouse, where the data is stored in columnar formats and optimized for massive read-heavy queries, batch processing, and AI model training.

## Trade-offs

One significant trade-off in this polyglot persistence design is the **high architectural complexity and data synchronization overhead**. Maintaining a Relational DB, a Vector DB, a Time-Series DB, and a Data Warehouse simultaneously requires specialized engineering knowledge and introduces the risk of data becoming out-of-sync across systems. 

To mitigate this, I would implement a robust data orchestration tool like Apache Airflow to strictly schedule and monitor the ETL pipelines. Additionally, by using the central Data Lakehouse as the "single source of truth," all downstream systems (like the Vector DB and Data Warehouse) act as derived views, ensuring that if a synchronization error occurs, the pipelines can be rebuilt from a unified, immutable historical record.
