-- This is my "hot query"
EXPLAIN ANALYZE
SELECT o.id,
       o.quantity,
       o.totalPrice,
       o."createdAt",
       oi.id AS "orderItemId",
       oi.quantity AS "orderItemQuantity",
       p.id AS "productId",
       p.title AS "productTitle"
FROM orders o
JOIN order_item oi ON oi."orderId" = o.id
JOIN product p ON p.id = oi."productId"
WHERE o."userId" = 5
ORDER BY o."createdAt" DESC
LIMIT 10 OFFSET 0;
-- I've optimized Index
CREATE INDEX idx_orders_user_created
ON orders ("userId", "createdAt" DESC);