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

    // Inserts a new node after the current node (which node will be the current node after the insertion?)
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

    // Delete the current node (which node will be the current node after the deletion?)
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

    sort(isNumber) {
        this.head = utility.mergeSort(this.head, isNumber);
        this.current = this.head;
        this.tail = this.head;
        
        let current = this.head;
        while (current !== null) {
            this.tail = current;
            current = current.forwardNode;                              
        }                
    }                
}

const utility ={

    // https://www.techiedelight.com/merge-sort/
    // Merge sort is an efficient sorting algorithm which produces a stable sort,
    // which means that if two elements have the same value, they holds same relative
    // position in the output as they did in the input. In other words, the relative 
    // order of elements with equal values is preserved in the sorted output. 
    // Merge sort is a comparison sort which means that it can sort any input for 
    // which a less-than relation is defined.
    // 1. Divde the unsorted array into n subarrays, each of size 1 
    //    (an array of size 1 is considered sorted).
    // 2. Repeatedly merge subarrays to produce new sorted subarrays until
    //    only 1 subarray is left which would be our sorted array.
    // For Non-Cicular Double Linked List
    mergeSort: (source, isNumber) => {
        // https://www.geeksforgeeks.org/merge-sort-for-linked-list/
        // 1) If the head is NULL or there is only one element in the Linked List 
        //     then return.
        // 2) Else divide the linked list into two halves.  
        // 3) Sort the two halves a and b.
        // 4) Merge the sorted a and b
        
        // TERMINATION CONDITION
        if (source === null) {
            return source;
        }

        // BASE CASE
        if (source.forwardNode === null) {
            return source;
        }
        // RECURSION
        else
        {
            const heads = utility.frontBackSplit(source);            
            let front = heads[0];
            let back = heads[1];

            // Recursively sort the sublists
            front = utility.mergeSort(front, isNumber);
            back = utility.mergeSort(back, isNumber);

            // merge the two sorted lists together
            return utility.sortedMerge(front, back, isNumber);
            // return back;
        }         
    },

    sortedMerge: (a, b, isNumber) => { 
    
        // TERMINATION CONDITION
        if ((a === null) && (b === null)) {
            return (null);
        }                

        // BASE CASE
        if (a === null) {
            return b; 
        }            
        if (b === null) {
            return a; 
        }            
    
        // RECURSION
        // Pick either a or b, and recur
        let result = null;
        if ((isNumber ? Number(a.amount) : a.subject) <= (isNumber ? Number(b.amount) : b.subject)) { 
            result = a;
            b.backwardNode = a;
            result.forwardNode = utility.sortedMerge(a.forwardNode, b, isNumber); 
        } 
        else { 
            result = b;
            a.backwardNode = b;
            result.forwardNode = utility.sortedMerge(a, b.forwardNode, isNumber); 
        } 
        return result; 
    }, 

    frontBackSplit: (source) => {
        
        let fast = null;
        let slow = source;
        let back = null;

        if (slow !== null){
            fast = source.forwardNode;

            // Advance 'fast' two nodes, and advance 'slow' one node
            while (fast !== null) { 
                fast = fast.forwardNode;

                if (fast !== null) { 
                    slow = slow.forwardNode; 
                    fast = fast.forwardNode; 
                } 
            }     
            
            // 'slow' is before the midpoint in the list, so split it in two at that point.
            back = slow.forwardNode
            slow.forwardNode = null;    // break the front tail

            if (back !== null) {
                back.backwardNode = null;   // break the back head
            }            
        }
       
        return [source, back];
    }
}

export default {ListNode, LinkedList, utility};