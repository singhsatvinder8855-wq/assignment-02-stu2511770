## Anomaly Analysis

* **Insert Anomaly:** In the current flat file, we cannot add a new product to our catalog (e.g., a new "Printer" with a specific price) until a customer actually places an order for it. Because the table is driven by `order_id`, attempting to insert a product without an order would require entering NULL values for customer and order details, which violates primary key constraints.
* **Update Anomaly:** Customer Priya Sharma (`C002`) appears in multiple rows (e.g., `ORD1027`, `ORD1002`, `ORD1037`). If Priya moves and changes her city or email, we must update every single row associated with her. If even one row is missed, the database becomes inconsistent.
* **Delete Anomaly:** Order `ORD1185` is the only row in the entire dataset that contains the product `P008` (Webcam). If Amit Verma cancels this order and we delete the row, we completely lose all information about the Webcam product, including its category and unit price.

## Normalization Justification

While keeping everything in a single table might seem visually simpler to read at a glance, it is fundamentally flawed for a transactional database and represents severe under-engineering, not over-engineering. A flat file structure forces massive data redundancy, leading directly to data integrity issues.

For example, our dataset repeats the exact same office address ("Delhi Office, Connaught Place, New Delhi - 110001") for every single order handled by Anita Desai. If the office moves, a single flat file requires hundreds of row updates, wasting computational resources and increasing the risk of errors. Furthermore, the delete anomaly actively threatens our business intelligence; deleting order `ORD1185` erases our only record of the "Webcam" product entirely. 

Normalizing to 3rd Normal Form (3NF) solves this by separating distinct entities (Customers, Products, Sales Reps, and Orders) into their own tables. This guarantees that a customer's email or a product's price is stored in exactly one place. Updates become instantaneous single-row operations, and we can maintain a complete product catalog regardless of whether an item has been ordered recently. In a scaling retail environment, normalization is essential for accurate reporting and system stability.
