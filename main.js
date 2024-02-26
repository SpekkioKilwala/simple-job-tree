// need the object model

// Nodes HAVE:
//  exits
//  rules (for direct access e.g. warp songs, loading game, current location)
//  solutions for reaching them
// Exits HAVE:
//  rules
//  a node (probably)
// Rules HAVE:
//  A set function that resolves down to a true/false
//  A list of things that that function relies on
// solutions HAVE....
//  I dunno yet

class Node {
    constructor(id, exits) {
        this.id = id;
        // a node LABEL would go here when I need it
        this.rules = []; // remember that rules on a node are for instant-access stuff
        //                  (nodes can be accessed from other nodes via their exits)
        this.exits = exits;
    }
}

class Exit {
    // nodes HAVE exits
    constructor(id, deferLink) {
        this.id = id;
        // an exit label would go here when I need it
        this.rules = [];
        this.deferLink = deferLink // resolve later once all the nodes should exist
    }

    resolve() {
        // exits are maybe defined with the ID of a node they're meant to link to,
        // but exits are created (for convenience) when the node is,
        // so the intended destination node is unlikely to always exist.
        // this turns the intended link-ID into the actual object reference. Hopefully.
        if (this.deferLink) {
            if (nodeContainer[this.deferLink]) {
                this.link = nodeContainer[this.deferLink];
                this.deferLink = undefined;
            }
            else {
                console.log(`Failed to resolve node link ${this.deferLink}`)
            }
        }
    }
}

const nodeContainer = {
    // The nodes are all just members of this, because that means that you can get a direct
    // reference to any node if you just know the name, which is important.
    // (otherwise I might have to use something like eval which is definitely wrong)
    // I don't want to give this any other responsibilities like linking nodes together.
    // it's essentially nothing BUT a node-name catalog.
    add: function(node) {
        this[node.id] = node;
    }
}

// In most cases, if you know enough about a node to know its name,
// then you also know what the exits are.
// so I want a handy function that will give me back a node, with exits.
// furthermore, some nodes will always connect to others because they're the same map,
// so a way to connect them together would be nice.

// exitMaker(id, optional link)
// but remember that you can't finish the linking until that node EXISTS.
// so I think that that means that exits get created with something that WILL resolve
// to an actual node LATER, then after it's all loaded in (to the nodeContainer) I
// can go through all the nodes and hook them up.
// I'm going to just assume that the nodeContainer will always be a thing.

// we explicitly attempt to create a (deferred) link to the field before the field node exists
nodeContainer.add(new Node("home", [new Exit("door", "field")]));
nodeContainer.add(new Node("field"));
nodeContainer.add(new Node("castle"));

// and then we'll resolve it, if I'm lucky
for (const node in nodeContainer) {
    // This check should be a little more specific; I only want to run this on NODES.
    if ((typeof node) != "object") {
        continue;
    } 
    for (const exit in node.exits) {
        exit.resolve();
    }
}