import EventEmitter from "node:events";

function createDomElements() {
    const myEmitter = new EventEmitter();

    return {
        addEventListener(eventType, listener) {
            myEmitter.on(eventType, listener);
        },
        removeEventListener(eventType, listener) {
            myEmitter.off(eventType, listener);
        },
        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            myEmitter.emit(event.type, event);
        }
    };
}

const button = createDomElements();

button.addEventListener("save", () => {
    console.log("Saving");
});

button.dispatchEvent({
    type: "save"
});

function handleClick(event) {
    console.log("user clicked");
    console.log("event type:", event.type);
    console.log("event detail:", event.detail);
}

button.addEventListener("click", handleClick);
button.dispatchEvent({
    type: "click"
});

button.addEventListener("submit", (event) => {
    console.log("Data submitted");
    console.log("event type:", event.type);
    console.log("event detail:", event.detail);
});
button.dispatchEvent({
    type: "submit"
});