import {Observable} from 'rxjs/Rx';

var observable = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next: x => console.log('got value ' + x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
});

$(()=>{
    const $button =$(".b");
    Observable.fromEvent($button, 'click')
    .scan(count => count + 1, 0)
    .subscribe(count => console.log(`Clicked ${count} times`));
})
