/*
 * Copyright 2022
 */
package com.github.idelstak.stream.filter;

/**
 *
 * @author sangniao.com <https://github.com/sangniao>
 */
public class CombinedParallelFilters extends FilterFigures {

    public CombinedParallelFilters(double exponent) {
        super(exponent);
    }

    @Override
    public void doFilter() {
        long figuresMeetingCriteria = super.getRandomFigures()
                .stream()
                .parallel()
                .filter(
                        figure -> figure < Math.PI
                        && figure > Math.E
                        && figure != 3
                        && figure != 2
                )
                .count();
    }

}
