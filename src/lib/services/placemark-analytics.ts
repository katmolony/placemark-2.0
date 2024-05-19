import type { Location, Business, DataSet } from "$lib/types/placemark-types";


export function checkTemperatureTrend(temperatures: number[]): string {
    if (temperatures.length < 3) {
        return "Insufficient data";
    }

    const temp0 = temperatures[0];
    const temp1 = temperatures[1];
    const temp2 = temperatures[2];

    if (temp0 > temp1 && temp1 > temp2) {
        return "Temperature is rising";
    } else if (temp0 < temp1 && temp1 < temp2) {
        return "Temperature is falling";
    } else {
        return "Temperature is steady";
    }
}