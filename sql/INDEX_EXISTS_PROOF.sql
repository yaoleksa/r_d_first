--SET enable_indexscan = off; -- to prove the effectiveness of the index
SELECT indexname, indexdef FROM pg_indexes WHERE tablename='order';
EXPLAIN ANALYZE SELECT * FROM "order" WHERE "userId"='7' ORDER BY "userId", "createdAt";
EXPLAIN ANALYZE SELECT * FROM "order" WHERE "userId"='7' ORDER BY "userId", "createdAt" DESC;