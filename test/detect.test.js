const detect = require('../src/detect')

describe('Detect Xendit API Test', () => {

	test('Detect Api Key, should return 3 path', () => {
		let prDiff = [{'filename':'.github/workflows/xendit-secret.yaml','additions':1,'deletions':1,'changes':2,'patch':['@@ -10,4 +10,4 @@ jobs:','       # - name: Checkout','         # uses: actions/checkout@v3','       - name: Scan action','-        uses: xenzun/poc-api-key-scanner-action@v3.7.0','\\ No newline at end of file','+        uses: xenzun/poc-api-key-scanner-action@v4.3.0','\\ No newline at end of file']},{'filename':'app/route.js','additions':2,'deletions':0,'changes':2,'patch':['@@ -6,6 +6,8 @@ function route(app) {','     const tags = req.query.tags;','     const tagmode = req.query.tagmode;',' ','+    const sk = "sk_live_alsdfjkaouiafhh234hiuahf7IHJKG86sdfbjhsdf2i734HGsdf44"','+    console.log(sk)','     const ejsLocalVariables = {','       tagsParameter: tags || \'\',','       tagmodeParameter: tagmode || \'\',']},{'filename':'test3.txt','additions':2,'deletions':1,'changes':3,'patch':['@@ -1 +1,2 @@','-test action','\\ No newline at end of file','+test action','+xnd_production_alkfjajsdfhainsodfasudfgnahsiuyfddh67as6f5as67dfasdgf7as6f5as67d8f','\\ No newline at end of file']},{'filename':'test4.txt','additions':3,'deletions':1,'changes':4,'patch':['@@ -1 +1,3 @@','-testsets aciton','\\ No newline at end of file','+testsets aciton','+lalalal','+iluma_production_asdfasdfjlasidfa87oagFD7y87dfys87adf6&*FDSsdf','\\ No newline at end of file']}]
		let paths = detect.detectXenditAPI(prDiff)
		expect(paths.length).toBe(3)
	} )

	test('Detect clean pr diff, should return 0 path', () => {
		let prDiff = [{'filename':'.github/workflows/xendit-secret.yaml','additions':1,'deletions':1,'changes':2,'patch':['@@ -10,4 +10,4 @@ jobs:','       # - name: Checkout','         # uses: actions/checkout@v3','       - name: Scan action','-        uses: xenzun/poc-api-key-scanner-action@v3.7.0','\\ No newline at end of file','+        uses: xenzun/poc-api-key-scanner-action@v4.3.0','\\ No newline at end of file']},{'filename':'app/form_validator.js','additions':3,'deletions':0,'changes':3,'patch':['@@ -5,6 +5,9 @@ function isValidCommaDelimitedList(value) {',' }',' ',' function isValidTagmode(value) {','+  if (value == \'test\'){','+    return false','+  }','   return value === \'all\' || value === \'any\';',' }',' ']},{'filename':'app/server.js','additions':2,'deletions':0,'changes':2,'patch':['@@ -22,4 +22,6 @@ const port = process.env.PORT || 3000;',' app.server = app.listen(port);',' console.log(`listening on port ${port}`);',' ','+console.log(port)','+',' module.exports = app;']}]
		let paths = detect.detectXenditAPI(prDiff)
		expect(paths.length).toBe(0)
	} )
})