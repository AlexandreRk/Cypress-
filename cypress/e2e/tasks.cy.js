/// <reference types="cypress" />

//import {faker} from '@faker-js/faker'



describe ('tarefas', ()=> { 

    let testData;

    before (()=> {
        cy.fixture('tasks').then(t=>{
            testData = t 
        })

    })

    // beforeEach(()=> {
    //     cy.viewport(1920, 1080)
    // })



    context('cadastro', () =>{

    it('deve cadastrar uma nova tarefa', ()=> {


        const taskName = 'Ler um livro de Node.js'

        cy.removeTaskByName(taskName)

        // cy.visit('http://localhost:3000')

        // //cy.get('#newTask')
        // cy.get('input[placeholder="Add a new Task"]')
        //     //.type(faker.music.songName())
        //     .type(taskName)

        cy.createTask(taskName)
        //     //cy.get('._listButtonNewTask_1y0mp_40')
        //     //cy.get('//button[contains(text(), "Create")]
        //     cy.contains('button', 'Create').click()

            
            cy.contains('main div p', taskName)
                .should('be.visible')
    })

    it('não deve permitir tarefa duplicada', ()=>{

    const task = testData.dup
    

    cy.removeTaskByName(task.name)
    // cy.request({
    //     url: 'http:/localhost:3333/helper/tasks',
    //     method: 'DELETE',
    //     body: { name: task.name } 
    // }).then(response => {
    //     expect(response.status).to.eq(204)
    // })    
    //dado que eu tenho uma tarefa duplicada 
    // cy.visit('http://localhost:3000')
    
    // cy.get('input[placeholder="Add a new Task"]')
    //     .type('Estudar javascript')

    // cy.contains('button', 'Create').click()
    cy.postTask(task)

    // Quando faço o cadastro dessa tarefa


    cy.createTask(task.name)
    // cy.visit('http://localhost:3000')
    
    // cy.get('input[placeholder="Add a new Task"]')
    //     .type('Estudar javascript')

    // cy.contains('button', 'Create').click()

    // Então vejo a mensagem de duplicidade

    cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!')
    })


    it('campo obrigatório', ()=> {
    cy.createTask()
    cy.isRequired('This is a required field')
    })

    }) 
})
context(' atualização', ()=> {
    it('deve concluir uma tarefa', ()=>{
        const task= {
            name:'Estudar javascript',
            is_done: false 
        }

        cy.removeTaskByName(task.name) 
        cy.postTask(task)  

        cy.visit('/')

        cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()

        cy.contains('p', task.name)
        .should('have.css', 'text-decoration-line', 'line-through')
    })

    context(' Exclusão', ()=> {
        it('deve remover uma tarefa', ()=>{
            const task= {
                name:'Mamar o vesgo',
                is_done: false 
            }
    
            cy.removeTaskByName(task.name) 
            cy.postTask(task)  
    
            cy.visit('/')
    
            cy.contains('p', task.name)
            .parent()
            .find('button[class*=ItemDelete]')
            .click()
    
            cy.contains('p', task.name)
            .should('not.exist')
        })
    })
})
