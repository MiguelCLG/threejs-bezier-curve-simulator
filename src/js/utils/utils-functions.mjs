function RandomFloatRange(min, max)
{
    return Math.random() * (max - min) + min;
}

function RandomIntRangeExclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function RandomIntRangeInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export { RandomFloatRange, RandomIntRangeInclusive, RandomIntRangeExclusive };

/** 
 * 
 * Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * 
*/