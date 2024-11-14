package com.bookmanagement.BookManagementSystem.repository;

import com.bookmanagement.BookManagementSystem.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
}
