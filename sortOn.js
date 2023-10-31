/*! by mike gieson www.gieson.com 2023-10-31 */
function sortOn(arr, prop, optOrReverse, numeric, natural, caseSensitive) {

    if (typeof optOrReverse == 'object') {
        reverse = optOrReverse.reverse;
        numeric = optOrReverse.numeric;
        natural = optOrReverse.natural;
        caseSensitive = optOrReverse.caseSensitive;
    }

    // Ensure there's a property
    if (!prop || !arr) {
        return arr
    }

    if (arr.length < 1) {
        return arr;
    }

    var sort_by = function (field, rev, num) {

        var primer = num ? function (val) {
            return parseFloat(String(val).replace(/[^0-9.\-]+/g, ''));
        } : function (val) {
            return String(val).toLowerCase();
        }

        var r = rev ? -1 : 1;

        // Return the required a,b function
        return function (a, b) {

            // Reset a, b to the field
            a = primer(a[field]), b = primer(b[field]);

            // Do actual sorting, reverse as needed
            //return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
            //var result = ((a > b) - (b > a)) * ();

            if (num) {

                return (a - b) * r;
            } else {
                //return a.localeCompare(b) * r;
                if (natural) {
                    return naturalCompare(a, b, caseSensitive)
                } else {
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * r;
                }
            }

        };

    }

    var runner = function (Vprop, Vreverse, Vnumeric) {

        if (typeof Vnumeric == 'undefined') {
            var first = arr[0][Vprop];
            if (typeof first == 'number') {
                Vnumeric = true;
            }
        }

        arr.sort(sort_by(Vprop, Vreverse, Vnumeric));

    }


    if (typeof prop == "object") {
        for (var i = 0; i < prop.length; i++) {
            runner(prop[i], reverse, numeric);
        }
    } else {
        runner(prop, reverse, numeric);
    }

    function naturalCompare(a, b, caseSensitive) {
        var readPos;
        var codeA;
        var codeB;
        var posA = 0;
        var posB = 0;

        var getCode = function (str, pos, reading) {

            var code;

            // ------------------------------------------------------------
            // We are cheaply dual-purposing getCode function.
            // Technically, this would exist in it's own function,
            // but since both functions use the same argument signature, 
            // we can cobble them together and make it a little more transportable.
            // ------------------------------------------------------------

            // ------------------------------------------------------------
            // Parse Numbers Part
            // ------------------------------------------------------------
            // This part could aptly be named "parseNumber" because it's 
            // job is to walk through the string and parse out the first
            // set of numeric characters it comes across.
            //
            // Used exclusively down where you see the comment "parseNumber".

            if (reading) {

                // move cursor as we find numbers
                readPos = pos;

                code = getCode(str, readPos);
                while (code < 75 && code > 62) {
                    code = getCode(str, ++readPos);
                }

                return +str.slice(pos - 1, readPos) // + to force to a number
            }

            // ------------------------------------------------------------
            // Consolidate Alphanumeric Characer Codes
            // ------------------------------------------------------------
            // This part organizes character codes so alphanumeric 
            // chars ( 0-9 . A-Z a-z ) are tightly clumped together from 63-126
            // ... and maintains integrity of character codes < 45 and > 126
            // ... and ensures punctuation characters always sort lower than alpha-numerics
            //
            // Because ASCII has puncutation scattered inbetween
            //  [puncs here] 0-9 [puncs here] A-Z [puncs here] a-z [puncs here]
            //
            // By clumping alphanumerics together, it will be faster to > range < these.
            //
            // Number range : code < 75 && code > 62
            //
            // A couple tricky-dicky things we're doing here:
            // - Moving "." above 0-9 so integers sort lower and floats sort higher.
            // - Moving "-" just under 0-9 so we can group "-" as a number and 
            //   perform relatively inexpensive "proper" negative number sorting.
            //
            // Yes, this took some grunt work.
            // 
            // The logic re-works char codes as:
            // --------------------------
            //  < 45 nothing changes
            // --------------------------
            //  /   new 45  <- real 47     bump down to full gap from moving . and  -
            // --------------------------  
            //  :   new 46  <- real 58     punctuation group 1
            //          ...
            //  @   new 52  <- real 64
            // --------------------------
            //  [   new 53  <- real 91     punctuation group 2
            //          ...
            //  `   new 58  <- real 96     
            // --------------------------
            //  {   new 59  <- real 123     punctuation group 3
            //          ...
            //  ~   new 62  <- real 126
            // --------------------------
            //  -   new 63  <- real 45     group with numbers so negatives sort correctly
            // --------------------------
            //  0   new 64  <- real 48     0-9
            //          ...
            //  9   new 73  <- real 57 
            // --------------------------
            //  .   new 74  <- real 46     moved above 0-9 so ints sort higher than floats
            // --------------------------
            //  A   new 75  <- real 65     A-Z
            //          ...
            //  Z   new 100 <- real 90
            // -------------------------- 
            //  a   new 101 <- real 97     a-z
            //          ...
            //  z   new 126 <- real 122
            // --------------------------
            //  > 126 nothing changes

            code = str.charCodeAt(pos) || 0;

            if (code < 45 || code > 126) {
                return code       // leave "as is"

            } else if (code < 46) {
                return 63;        // - bump just under 0-9

            } else if (code < 47) {
                return 74;        // . move above 0-9

            } else if (code < 48) {
                return 45;        // / bump below -

            } else if (code < 58) { // 0-9
                return code + 16;

            } else if (code < 65) { // punctuation group 1 (7 chars)
                return code - 12;

            } else if (code < 91) { // A-Z
                return code + 10;

            } else if (code < 97) { // punctuation group 2 (5 chars)
                return code - 38;

            } else if (code < 123) { // a-z
                return code + 4;

            } else {               // punctuation group 3 (4 chars)
                return code - 64;
            }

        }

        // Force things to strings
        if ((a += "") != (b += "")) {

            if (!caseSensitive) {
                a = a.toUpperCase(); // upper case are lower code numbers, so it'll run faster
                b = b.toUpperCase();
            }

            // Only read along the shortest string length;
            var min = Math.min(a.length, b.length);
            while (posA < min) {

                // These may ned up being numeric OR alpha
                codeA = getCode(a, posA++);
                codeB = getCode(b, posB++);

                // parse numbers
                if (codeA < 75 && codeB < 75 && codeA > 62 && codeB > 62) {

                    // last arg as true to use first part "parseNumber" of dual-personality getCode
                    codeA = getCode(a, posA, true);
                    codeB = getCode(b, posB, true);

                    // whilst still a number, reset posistions to readPos that parseNumber derived
                    posA = readPos;
                    posB = readPos;
                }

                // things like "000" will parseNumber out to 0, in which case, 
                // we'll have to resort to traditional sorting :/
                if (codeA === 0 && codeB === 0) {
                    codeA = a
                    codeB = b
                }

                if (codeA != codeB) {
                    return (codeA < codeB) ? -1 : 1
                }

            }

        }

        return 0

    }


}