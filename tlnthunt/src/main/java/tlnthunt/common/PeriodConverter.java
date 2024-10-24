package tlnthunt.common;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import static tlnthunt.common.Period.*;

@Converter(autoApply = true)
public class PeriodConverter implements AttributeConverter<Period, String> {
    @Override
    public String convertToDatabaseColumn(Period period) {
        if(period == null) throw new NullPointerException("period is null");

        return switch (period) {
            case ONE_MONTH -> ONE_MONTH.getTime();
            case MORE_THAN_THREE_MONTHS -> MORE_THAN_THREE_MONTHS.getTime();
            case LESS_THAN_A_MONTH -> LESS_THAN_A_MONTH.getTime();
        };
    }

    @Override
    public Period convertToEntityAttribute(String s) {
        if(s == null) throw new NullPointerException("period is null");

        return switch (s) {
            case "one month" -> ONE_MONTH;
            case "more than three months" -> MORE_THAN_THREE_MONTHS;
            case "less than a month" -> LESS_THAN_A_MONTH;
            default -> null;
        };
    }
}
