package com.ary.loja.order;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {

    @Query(value = """
            SELECT AVG(op.price * op.quantity)
            FROM order_product op
            JOIN customer_order o ON o.id = op.order_id
            WHERE EXTRACT(YEAR FROM o.order_date_time) = :year
              AND EXTRACT(MONTH FROM o.order_date_time) = :month
              AND o.cancelled = false
            """, nativeQuery = true)
    Double findAverageSale(int year, int month);

    @Query(value = """
            SELECT MAX(op.price * op.quantity)
            FROM order_product op
            JOIN customer_order o ON o.id = op.order_id
            WHERE EXTRACT(YEAR FROM o.order_date_time) = :year
              AND EXTRACT(MONTH FROM o.order_date_time) = :month
              AND o.cancelled = false
            """, nativeQuery = true)
    Double findMaxSale(int year, int month);

    @Query(value = """
            SELECT MIN(op.price * op.quantity)
            FROM order_product op
            JOIN customer_order o ON o.id = op.order_id
            WHERE EXTRACT(YEAR FROM o.order_date_time) = :year
              AND EXTRACT(MONTH FROM o.order_date_time) = :month
              AND o.cancelled = false
            """, nativeQuery = true)
    Double findMinSale(int year, int month);

}
