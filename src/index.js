/**
 * Esas horas de práctica y error son parte necesaria del proceso de aprendizaje.
 * ¡Me alegro que estés aquí! :)
 */

import { auditTime, fromEvent } from "rxjs";

const circle01 = document.getElementById("circle-01");
const circle02 = document.getElementById("circle-02");
const position01 = document.getElementById("clientX");
const position02 = document.getElementById("clientY");
const transformButton = document.getElementById("transform-button");
const subscribeButton = document.getElementById("subscribe-button");

const onMouseMove$ = fromEvent(document, "mousemove");

const circle01$ = onMouseMove$.pipe(auditTime(750));
circle01$.subscribe({
  next: ({ clientX }) => {
    circle01.style.transform = `scale(1.${clientX})`;
  },
});

const circle02$ = onMouseMove$.pipe(auditTime(500));
circle02$.subscribe({
  next: ({ clientY }) => {
    circle02.style.transform = `scale(1.${clientY})`;
  },
});

const position$ = onMouseMove$.pipe(auditTime(100));
position$.subscribe({
  next: ({ clientX, clientY }) => {
    position01.innerText = Math.round(clientX);
    position02.innerText = Math.round(clientY);
  },
});

let valuesConsoleLog = {
  next: (value) => {
    console.log(value);
  },
};

let transformedValuesConsoleLog = {
  next: (value) => {
    console.log({ x: value.clientX, y: value.clientY });
  },
};

let subscriptionSubscription;
subscribeButton.addEventListener("click", () => {
  if (subscribeButton.getAttribute("data-subscription") === "on") {
    subscriptionSubscription = onMouseMove$.subscribe(valuesConsoleLog);
    subscribeButton.textContent = "Unsubscribe";
    subscribeButton.setAttribute("data-subscription", "off");
  } else {
    subscriptionSubscription.unsubscribe();
    subscribeButton.textContent = "Subscribe";
    subscribeButton.setAttribute("data-subscription", "on");
    console.log("------------------------------------");
    console.log("----------- UNSUBSCRIBED -----------");
    console.log("------------------------------------");
  }
});

let subscriptionTransform;
transformButton.addEventListener("click", () => {
  if (transformButton.getAttribute("data-transform") === "on") {
    subscriptionTransform = onMouseMove$.subscribe(transformedValuesConsoleLog);
    subscriptionSubscription.unsubscribe();
    transformButton.textContent = "Stop Transform";
    transformButton.setAttribute("data-transform", "off");
  } else {
    subscriptionTransform.unsubscribe();
    subscriptionSubscription = onMouseMove$.subscribe(valuesConsoleLog);
    transformButton.textContent = "Transform";
    transformButton.setAttribute("data-transform", "on");
    console.log("------------------------------------");
    console.log("---------- STOP TRANSFORM ----------");
    console.log("------------------------------------");
  }
});
