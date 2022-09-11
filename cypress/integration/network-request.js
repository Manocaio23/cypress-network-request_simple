/// <reference types="cypress"/>


describe('Netwoking request', () => {
    let message = "Unable to find comment!"
    beforeEach('', () => {
        cy.visit("https://example.cypress.io/commands/network-requests")

    });
    it('teste', () => {// interceptar a url com get colocando apelido e garantido que o status é 200
        cy.intercept({
            method: "GET",
            url: "**/comments/*"
        }, {
            body: {
                postId: 1,
                id: 1,
                name: "Mano Caio",
                email: "manocaio@hotmail.com",
                body: "Estou apredendo testes de api" // aqui posso colocar o copo no body da api deles
            }



        }).as("getComment")

        cy.get(".network-btn").click()

        cy.wait("@getComment").its("response.statusCode").should("eq", 200)
    });

    it('Post', () => {
        cy.intercept("POST", "/comments").as("postComment")

        cy.get(".network-post").click()

        //aqui a gente pega a interceptacao apos clicar no Post

        cy.wait("@postComment").should(({request, response})=>{
            console.log(request)

            expect(request.body).to.include("email") // dentro do body existe email?

            console.log(response)// resposta é o que tem dentro do body

            expect(response.body).to.have.property("email","hello@cypress.io")// dentro do body na resposta deve contar eses dois paramentro

            expect(request.headers).to.have.property("content-type")

            expect(request.headers).to.have.property("origin","https://example.cypress.io")


        })

       
    });

    it('Put Request', () => {
        cy.intercept({
            method:"PUT",
            url:"**/comments/**" // depois da acao a gente pega o link gerado
        },
        {
            statusCode:404,
            body:{error:message},
            delay:500   // aqui posso colocar o copo no body da api deles


        }).as("putComment")

        cy.get(".network-put").click()

        cy.wait("@putComment")
        
        cy.get(".network-put-comment").should("contain",message)

        expect(request.headers).to.have.property("host","jsonplaceholder.cypress.io")

        expect(response.body).to.have.property("name","Using PUT in cy.intercept()")
    }); 
});