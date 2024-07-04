describe("template spec", () => {
  it("Verifica se app está abrindo", () => {
    cy.visit("http://127.0.0.1:7001/");
  });

  it("Insere uma tarefa", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("TP2 de Engenharia de Software{enter}");

    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de Engenharia de Software");
  });

  it("Insere e deleta uma tarefa", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("TP2 de Engenharia de Software{enter}");

    cy.get(".todo-list li .destroy").invoke("show").click();

    cy.get(".todo-list li").should("have.length", 0);
  });

  it("Filtra tarefas completas e ativas", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("TP2 de ES{enter}").type("Prova de ES{enter}");

    cy.get(".todo-list li .toggle").first().click();

    cy.contains("Active").click();
    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "Prova de ES");

    cy.contains("Completed").click();
    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de ES");

    cy.contains("All").click();
    cy.get(".todo-list li").should("have.length", 2);
  });

  it("Marca todas as tarefas como completas", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo")
      .type("Tarefa 1{enter}")
      .type("Tarefa 2{enter}")
      .type("Tarefa 3{enter}");

    cy.get(".todo-list li .toggle").click({ multiple: true });

    cy.contains("Completed").click();
    cy.get(".todo-list li").should("have.length", 3);
  });

  it("Marca uma tarefa como completa e desfaz a marcação", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("Tarefa{enter}");

    cy.get(".todo-list li .toggle").click();

    cy.get(".todo-list li").should("have.class", "completed");

    cy.get(".todo-list li .toggle").click();

    cy.get(".todo-list li").should("not.have.class", "completed");
  });

  it("Edita uma tarefa existente", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("Tarefa original{enter}");

    cy.get(".todo-list li label").dblclick();

    cy.get(".todo-list li input.edit").clear().type("Tarefa editada{enter}");

    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "Tarefa editada");
  });
});
