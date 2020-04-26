class ListNode {
    constructor(subject, amount) {
        this.forwardNode = null;
        this.backwardNode = null;
        this.subject = subject;
        this.amount = amount;        
    }    
}

// Double linked list - Non Circular
class LinkedList {

    constructor() {
        this.head = null;
        this.current = null;
        this.tail = null;
        this.size = 0;
    }

    // Show the subject and the amount
    show() {
        return {subject: this.current.subject, amount: this.current.amount};
    }

    // Position to the first node
    first() {
        this.current = this.head;
        return this.current;
    }

    // Position to the last node
    last() {
        this.current = this.tail;
        return this.current;
    }
    
    // Move to the next node
    next() {        
        if (this.current !== null) {
            if (this.current.forwardNode !== null) {
                this.current = this.current.forwardNode;
            }            
        }
        return this.current;
    }

    // Backup one node
    previous() {
        if (this.current !== null) {
            if (this.current.backwardNode !== null) {
                this.current = this.current.backwardNode;
            }            
        }
        return this.current;      
    }

    // Inserts a new node after the current node
    insert(subject, amount) {
        const node = new ListNode(subject,amount);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            let current = this.current;
            let next = this.current.forwardNode;          

            // assign the new node forward and backward pointers
            node.forwardNode =  current.forwardNode !== null ? current.forwardNode : null;             
            node.backwardNode = current;            

            // re-assign current node forward pointer
            current.forwardNode = node;

            // re-assign next node backward pointer
            if (next !== null) {
                next.backwardNode = node;   
            }
            else {
                // the new node is the new tail
                this.tail = node;
            }            
        }

        this.current = node;  
        ++this.size;

        return node;
    }

    // Delete the current node
    delete() {

        if (this.current !== null) {
            let next = this.current.forwardNode;
            let prev = this.current.backwardNode;

            this.current = prev;

            if (prev !== null) {    // current node to be deleted is NOT head
                this.current.forwardNode = next;
            }
            else {                  // current node to be deleted is head
                this.head = next;
                this.current = next;
            }

            if (next !== null) {    // current node to be deleted is NOT tail
                next.backwardNode = prev;
            }
            else {                  // current node to be deleted is tail
                this.tail = prev;

                if (prev !== null) {    // current node to be deleted is not last node
                    prev.forwardNode = null;
                }            
            }
            
            --this.size;
        }
        
        return this.current;
    }

    // Show the total of all the amounts of all the ListNodes
    showtotal() {
        let current = this.head;
        let total = 0;

        while (current !== null) {
            total = total + Number(current.amount);
            current = current.forwardNode;
        }        

        return total;
    }
}

export default {ListNode, LinkedList};