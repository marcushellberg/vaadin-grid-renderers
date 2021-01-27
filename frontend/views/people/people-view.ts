import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "@polymer/iron-icon";
import "@vaadin/vaadin-button/vaadin-button";
import "@vaadin/vaadin-date-picker";
import "@vaadin/vaadin-form-layout/vaadin-form-layout";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import "@vaadin/vaadin-icons";
import "@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout";
import "@vaadin/vaadin-split-layout/vaadin-split-layout";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-upload";
import "@vaadin/vaadin-checkbox";
import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
} from "lit-element";
import Person from "../../generated/com/example/application/data/entity/Person";
import * as personEndpoint from "../../generated/PersonEndpoint";
// @ts-ignore
import styles from "./people-view.css";
import { GridColumnElement } from "@vaadin/vaadin-grid/src/vaadin-grid-column";
import { GridElement, GridItemModel } from "@vaadin/vaadin-grid";
import { render } from "lit-html";

@customElement("people-view")
export class PeopleView extends LitElement {
  @internalProperty()
  private people: Person[] = [];

  @internalProperty()
  private selectedItems: Person[] = [];

  render() {
    return html`
      <vaadin-grid
        id="grid"
        .items=${this.people}
        .rowDetailsRenderer=${this.rowDetailsRenderer}
        .selectedItems=${this.selectedItems}
        .detailsOpenedItems=${this.selectedItems}
        @active-item-changed=${this.toggleDetails}
      >
        <vaadin-grid-sort-column
          auto-width
          path="firstName"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          auto-width
          path="lastName"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          auto-width
          path="email"
          .renderer=${this.emailRenderer}
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          auto-width
          path="phone"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          auto-width
          path="dateOfBirth"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          auto-width
          path="occupation"
        ></vaadin-grid-sort-column>
      </vaadin-grid>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.people = await personEndpoint.findAll();
  }

  emailRenderer(root: HTMLElement, _: GridColumnElement, model: GridItemModel) {
    const person = model.item as Person;

    render(html` <a href="mailto:${person.email}">${person.email}</a> `, root);
  }

  rowDetailsRenderer(root: HTMLElement, _: GridElement, model: GridItemModel) {
    const person = model.item as Person;

    render(
      html` <b>Details for ${person.firstName} ${person.lastName}</b> `,
      root
    );
  }

  toggleDetails(e: CustomEvent) {
    const person = e.detail.value as Person;
    this.selectedItems = person ? [person] : [];
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    #grid {
      height: 100%;
    }
  `;
}
