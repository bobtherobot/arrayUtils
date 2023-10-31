var myfs = require('myfs');
const { minify } = require("terser");

/*
cd /Volumes/Drives/projects/arrayUtils
node ./build.js
*/

async function mini(file, dest){
    var code = myfs.open(file);

	var result = await minify(code, {
		toplevel: false,
		compress: {
			passes: 4
		},
		// format: {
		// 	preamble: myfs.open("header.txt")
		// }
	});

    console.log("result", result.code.length)
	console.log(dest);
	console.log(" ---------- complete -------------- ");
	myfs.save(dest, result.code);
}

mini("naturalCompare.js", "naturalCompare.min.js");
mini("sortOn.js", "sortOn.min.js");
