/*
 * Copyright 2022
 */
package com.github.idelstak.stream.filter;

/**
 *
 * @author sangniao.com <https://github.com/sangniao>
 */
public class ManySequentialFilters extends FilterFigures {

    public ManySequentialFilters(double exponent) {
        super(exponent);
    }

    @Override
    public void doFilter() {
        long figuresMeetingCriteria = super.getRandomFigures()
                .stream()
                .filter(figure -> figure < Math.PI)
                .filter(figure -> figure > Math.E)
                .filter(figure -> figure != 3)
                .filter(figure -> figure != 2)
                .count();
    }
}
