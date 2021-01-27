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

@customElement("people-view")
export class PeopleView extends LitElement {
  @internalProperty()
  private people: Person[] = [];

  render() {
    return html`
      <vaadin-grid id="grid" .items=${this.people}>
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
