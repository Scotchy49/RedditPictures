express = require('express')
Reddit = require('./reddit')

app = express.createServer()

app.configure(() -> 
	app.use(express.static(__dirname+'/public'))
	return
)

app.get('/pics/:after?', (req,res) -> 
	after = req.params.after
	reddit = new Reddit().req(after, (pictures) ->
		res.end(JSON.stringify(pictures))
	)
	return
)

app.get('/', (req,res) ->
	return
)
port = process.env.PORT || 3000

app.listen(port)

console.log "process started and listening on #{port}..."
