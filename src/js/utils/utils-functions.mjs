/*
    efolioB - Curvas de Bézier  
    Miguel Gonçalves 1901337 - 09/01/2023
*/

function RandomFloatRange(min, max) {
  return Math.random() * (max - min) + min;
}

function RandomIntRangeExclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function RandomIntRangeInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { RandomFloatRange, RandomIntRangeInclusive, RandomIntRangeExclusive };

/**
 *
 * Pequenas funções utils para deixar o código mais limpo. Procurei na documentação oficial e obtive estas 3.
 * Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 */
