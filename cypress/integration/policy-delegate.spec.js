/// <reference types="Cypress" />

describe("Policies", () => {
  beforeEach(() => {
    cy.login(Cypress.config("username"), Cypress.config("password"));

    cy.intercept("POST", "/api/v3/Policies/**/*").as("update");
    cy.intercept("GET", "*").as("fetch");
  });

  after(() => {
    cy.login(
      Cypress.config("secondaryUsername"),
      Cypress.config("secondaryPassword")
    );
    cy.removePolicies();
  });

  describe("Add manager to policy", () => {
    it("should go to policy and add manager", () => {
      cy.createPolicy();

      cy.visit("/policies");

      cy.wait(1000);

      cy.contains("Editable").click();
      cy.wait(1000);

      cy.contains("Manager").click();

      cy.wait(1000);

      //get second instance
      cy.get(".mat-checkbox").eq(1).click();

      cy.get("[data-cy=editSelection]").click({ force: true });
      cy.get("[data-cy=managerInput]").click({ force: true });
      cy.wait(1000);
      cy.get("[data-cy=managerInput]").type("cypress@manager.com{enter}");
      cy.get("[data-cy=managerChipList]")
        .children()
        .invoke("text")
        .should("contain", "cypress@manager.com");
      cy.get("[data-cy=saveButton]").click({ force: true });

      cy.wait("@update").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response.statusCode).to.eq(200);
      });

      cy.wait("@fetch");
      cy.wait(1000);
      cy.get("mat-cell.mat-column-manager")
        .first()
        .should("contain.text", "cypress@manager.com");
    });
  });
});
