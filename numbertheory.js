// (C)2016 Abram Wiebe, Number theory utility library
devquit =false;
function gcd(a,b) {
//itterative faste gcd from 
//http://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor
//
if( isNaN(a)|| isNaN(b))
	return NaN;

    if (a < 0) a = -a;
    if (b < 0) b = -b;
    if (b > a) {var temp = a; a = b; b = temp;}
    while (!devquit) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

//The probability that any two uniformly sampled integers are coprime is ~60%.
//pick a random integer within the desired range and test its GCD with the original number and loop (resampling it)
//if they are not coprime.
//Uses a heuristic, if heuristic fails you'll get NaN. it's random, so feel free to test returned value and try again.
function coprime(n) 
{
	if (n == NaN)
		return NaN;
	
	var MAX_ATTEMPTS=500;
    for(var i=0;i<MAX_ATTEMPTS;i++)
    {
    	candidate = randInt(n-1);
    	if(gcd(candidate,n)== 1)
    		return candidate;
    }
    return NaN;
}

//return integer between 0 and n inclusive
function randInt(n)
{
	return Math.floor((Math.random() * n) + 1);
}

//Must find primes to return result, if you want the prime list use
//eratosthenes instead, and ask for its length if you need euler_phi
function euler_phi(n)
{
	return eratosthenes(n).length;
}


//Prime seive
//From 
//http://codereview.stackexchange.com/questions/5334/sieve-of-eratosthenes-in-javascript
function eratosthenes(n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n), output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < n; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output;
};