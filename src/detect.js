
// Detect Xendit API in prDiff, return list of path
function detectXenditAPI(pullRequestDiff){
	const xenditPattern = /xnd_production_[0-9a-zA-Z/=\\+]{30,60}/
	const ilumaPattern = /iluma_production_[0-9a-zA-Z/=\\+]{30,60}/
	const instamoneyPattern = /sk_live_[0-9a-zA-Z/=\\+]{30,60}/
	let paths = []

	// Iterate throgh pull request diff and check using regex.
	for (let diff of pullRequestDiff){
		for (let chunck of diff.patch){
			if (chunck.startsWith('+')){
				let isXenditPattern = xenditPattern.test(chunck)
				let isIlumaPattern = ilumaPattern.test(chunck)
				let isInstamoneyPattern = instamoneyPattern.test(chunck)
				if (isXenditPattern | isIlumaPattern | isInstamoneyPattern){
					if (!paths.includes(diff.filename)){
						paths.push(diff.filename)
					}
				}
			}
		}
	}
	return paths
}

module.exports = {
	detectXenditAPI
}