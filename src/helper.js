async function getPullRequestDiff(octokit, owner, repo, pullRequestNumber) {
	const { data } = await octokit.pulls.listFiles({
		owner,
		repo,
		pull_number: pullRequestNumber
	})
  
	return data.map(file => ({
		filename: file.filename,
		additions: file.additions,
		deletions: file.deletions,
		changes: file.changes,
		patch: file.patch.split('\n')
	}))
}

async function sendPullRequestComment(octokit, owner, repo, pullRequestNumber, comment) {
	return await octokit.issues.createComment({
		owner,
		repo,
		issue_number: pullRequestNumber,
		body: comment
	})
}

function composeCommentMessage(paths){
	let comment = `<h3 dir="auto">[WARNING!!]</h3>
    <p dir="auto">Xendit Production API Key found in this file :</p>
    <ul dir="auto">`

	for (let path of paths){
		comment += '<li>' + path + '</li>'
	}
	comment += '</ul><p dir="auto"><em>Please rotate the key and remove it from the repository.</em></p>'
	return comment
}

module.exports = {
	getPullRequestDiff,
	composeCommentMessage,
	sendPullRequestComment
}