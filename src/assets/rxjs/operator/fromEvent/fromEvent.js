Rx.Observable.fromEvent(document.getElementById('fromEvent'), 'click')
	.subscribe(count => console.log(`Clicked !`));