import { useState } from "react";
import "./Tester.css";

/**
 * Returns an element's data-testId
 * @param element - The HTML element
 */
const getTestId = (element: any): string => element.dataset.testid;

/**
 * Returns an element's id
 * @param element - The HTML element
 */
const getId = (element: any): string => element.id;

/**
 * Returns an element's classList array
 * @param element - The HTML element
 */
const getClassName = (element: any): string =>
  `${element.className.replace(/\s+/g, ".")}`;

/**
 * Returns an element's innerText or textContext
 * @param element - The HTML element
 */
const getByText = (element: any): string =>
  element.textContext || element.innerText;

const getInnerHTML = (element: any) => element.innerHTML;

/**
 * Returns an element's type
 * @param element - The HTML element
 */
const getType = (element: any) => element.tagName;

/**
 * Returns an Array of all elements with a given data-testid
 * @param parent - The Tester's parent div
 * @param testId - The testid to look for
 */
const findAllElementsWithTestId = (parent: Element, testId: string) =>
  Array.from(parent.querySelectorAll(`[data-testid=${testId}]`));

/**
 * Returns an Array of all elements with a given id
 * @param parent - The Tester's parent div
 * @param id - The id to look for
 */
const findAllElementsWithId = (parent: Element, id: string) =>
  Array.from(parent.querySelectorAll(`.${id}`));

/**
 * Returns an Array of all elements with a given id
 * @param parent - The Tester's parent div
 * @param id - The id to look for
 */
const findAllElementsWithClassList = (parent: Element, classList: string) =>
  Array.from(parent.querySelectorAll(`.${classList.replace(/\s+/g, ".")}`));

const findUnique = (element: any) => {
  let uniqueObject = {
    testId: getTestId(element),
    id: getId(element),
    classes: getClassName(element),
    text: getByText(element),
    type: getType(element),
    innerHTML: getInnerHTML(element),
  };
  return uniqueObject;
};

export const findIfInnerHTMLIsUnique = (obj: { [key: string]: any }) => {};
export const Tester = (props: any) => {
  const [uuid] = useState("aaaabvvbbb");
  const [isSelectEnabled, setIsSelectEnabled] = useState(false);

  const findIfUnique = (obj: { [key: string]: any }) => {
    let uuidDiv = document.querySelector(`#${uuid}`);

    if (!uuidDiv) {
      return false;
    }

    let testIdElements = obj.testId
      ? findAllElementsWithTestId(uuidDiv, obj.testId)
      : [];
    let classListElements = obj.classes
      ? findAllElementsWithClassList(uuidDiv, obj.classes)
      : [];
    let idElements = obj.id ? findAllElementsWithId(uuidDiv, obj.id) : [];

    if (testIdElements.length === 1) {
      return { type: "getByTestId", value: obj.testId };
    }

    if (classListElements.length === 1) {
      return { type: "getByClassName", value: obj.testId };
    }

    if (idElements.length === 1) {
      return { type: "getById", value: obj.testId };
    }

    let setOfElements = new Set();
    testIdElements.forEach((e) => setOfElements.add(e));
    classListElements.forEach((e) => setOfElements.add(e));
    idElements.forEach((e) => setOfElements.add(e));

    let arrayOfElements = Array.from(setOfElements);
    arrayOfElements = arrayOfElements.filter((e: any) => {
      if (
        e.dataset.testid === obj.testId &&
        e.className.replace(/\s+/g, ".") === obj.classes &&
        e.id === obj.id
      ) {
        return true;
      }
    });

    if (arrayOfElements.length === 1) {
      return [
        { type: "getByTestId", value: obj.testId },
        { type: "getByClassName", value: obj.testId },
        { type: "getById", value: obj.testId },
      ];
    }

    // return queryBuilder;
  };
  const selectHandler = (selectedElement: any) => {
    if (selectedElement.path.find((e: any) => e.id === uuid)) {
      console.log(selectedElement);
      let query = findIfUnique(findUnique(selectedElement.target));
      console.log(query);
      setIsSelectEnabled(false);
      window.removeEventListener("click", selectHandler);
    }
  };

  const handleOnSelect = () => {
    setIsSelectEnabled(true);
    setTimeout(() => window.addEventListener("click", selectHandler), 10);
  };
  return (
    <>
      <button onClick={handleOnSelect}>Select</button>
      <div className={isSelectEnabled ? "farfig" : ""} id={uuid}>
        {props.children}
      </div>
    </>
  );
};
