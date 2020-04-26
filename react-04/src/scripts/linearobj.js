import Linked from './linkedlist.js';

class LIFO extends Linked.LinkedList {

    // head - bottom of stack
    // tail - top of stack
    push(subject, amount) {        
        super.last();
        super.insert(subject, amount);

        return this.current;
    }

    pop() {
        super.last();
        super.delete();

        return this.current;
    }
}

class FIFO extends Linked.LinkedList {

    // head - first in queue
    // tail - last in queue   
    enqueue(subject, amount) {
        super.last();
        super.insert(subject, amount);

        return this.current;
    }

    dequeue() {
        super.first();
        super.delete();

        return this.current;
    }
}

export default {FIFO, LIFO};