Rx.Observable.fromEvent(document.getElementById('fromEvent'), 'click')
	.scan(count => count + 1, 0)
	.take(5)
	.subscribe(count => console.log(`Clicked ${count} times`))