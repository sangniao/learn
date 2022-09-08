/*
 * Copyright 2022
 */
package com.github.idelstak.stream.filter;

import java.util.function.Predicate;
import java.util.stream.Stream;

/**
 *
 * @author sangniao.com <https://github.com/sangniao>
 */
public class SimpleFilter {

    public static void main(String[] args) {
        long count = new SimpleFilter().doCount();

        System.out.printf("fiveLetterWordsCount = %d\n", count);
    }

    public long doCount() {
        Stream<String> words = Stream.of("yearly", "years", "yeast", "yellow");
        Predicate<String> predicate = word -> word.length() == 5;

        return words
                .filter(predicate)
                .count();
    }
}
