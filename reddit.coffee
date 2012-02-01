http = require('http')
_u = require('underscore')

Reddit = ->
	console.log('requesting reddit...')

	this.req = (after, callback) ->
		http.get({
			host: 'www.reddit.com',
			port: 80,
			path: "/r/pics/.json?after=#{after}"
		}, (res) ->
			data = ""
			res.on('data', (chunk) ->
				data += chunk
			)

			res.on('end', ->
				callback(simplify(JSON.parse(data)))
			)
		).on('error', (e) ->
			callback(e.message)
		)
	
	return this

simplify = (redditData) ->
	{
		after: redditData.data.after
		pictures: _u.filter( 
			_u.map(redditData.data.children, (child) ->
				pic = child.data
				url = pic.url
				url = url + '.jpg' if url.indexOf('imgur') >= 0

				{
					image: url,
					thumb: pic.thumbnail,
					big: url
					title: "",
					description: pic.title
				})
			, 
			(pic) ->
				pic.image.indexOf('flickr') == -1
		)
	}
	

module.exports = Reddit