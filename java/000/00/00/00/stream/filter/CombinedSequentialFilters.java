/*
 * Copyright 2022
 */
package com.github.idelstak.stream.filter;

/**
 *
 * @author sangniao.com <https://github.com/sangniao>
 */
public class CombinedSequentialFilters extends FilterFigures {

    public CombinedSequentialFilters(double exponent) {
        super(exponent);
    }

    @Override
    public void doFilter() {
        long figuresMeetingCriteria = super.getRandomFigures()
                .stream()
                .filter(
                        figure -> figure < Math.PI
                        && figure > Math.E
                        && figure != 3
                        && figure != 2
                )
                .count();
    }

}
