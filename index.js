const github = require('@actions/github')
const core = require('@actions/core')
const detect = require('./src/detect')
const helper = require('./src/helper')
const { Octokit } = require('@octokit/rest')

// main function
async function main(){
	// define constant variable
	const context = github.context
	const token = core.getInput('github-token')
	const octokit = new Octokit({
		auth: token
	})

	// check wether it is pull requeest or not
	if (context.payload.pull_request == undefined){
		core.info('This action suitable for Pull Request only. Please use trigger : "on: pull_request" in the config')
		core.ExitCode = 0
		return
	}
	let prNumber = context.payload.pull_request.number
	let owner = context.repo.owner
	let repo = context.repo.repo

	let prDiff = await helper.getPullRequestDiff(octokit, owner, repo, prNumber)
	let paths = detect.detectXenditAPI(prDiff)

	// generate PR comment
	if (paths.length > 0){
		let comment = helper.composeCommentMessage(paths)
		helper.sendPullRequestComment(octokit, owner, repo, prNumber, comment)
		core.setFailed('WARNING!! Some file contains Xendit Production API Key : ' + paths.join(', ') + '. Please rotate the key.')
	} else {
		console.log('[Success] No Xendit API Key found.')
	}
}


main().catch(error => {
	core.setFailed(error.message)
})