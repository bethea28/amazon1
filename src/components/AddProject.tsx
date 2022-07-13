import React from 'react';
import {useForm} from "react-hook-form";
import { DialogTitle } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AddProject() {
    let state = {
        userId: "0001",
        projectName: "HelloWorld",
        targetFundingNum: "1000",
        targetFundingDate:"03/07/2023",
        description:"nice project",
        categories: "Art"
    }

    function handleSumbit(){
        //console.log(state);
        fetch('project', {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
         });
        

    }

  return (
    <div className="container">
         <Form>
            <Form.Label >Add Project</Form.Label>
            <Row className="mb-3">
            <Form.Group as={Col} controId="formUserId">
                
                <Form.Control type="name" 
                //value={state.applicant}
                onChange={e => state.userId = e.target.value}
                placeholder="Enter user id"/>
            </Form.Group>

            <Form.Group as={Col} controId="formProjectName">
                
                <Form.Control type="name"
                
                onChange={e => state.projectName = e.target.value}
                placeholder="Enter project name"/>
            </Form.Group>

            <Form.Group as={Col} controId="formTargetFundingNum">
               
                <Form.Control type="name"
                
                onChange={e => state.targetFundingNum = e.target.value}
                placeholder="Enter target funding number"/>

            </Form.Group>
            <Form.Group as={Col} controId="formTargetFundingDate">
               
                <Form.Control type="name"
                //value={state.foodItems}
                onChange={e => state.targetFundingDate = e.target.value}
                placeholder="Enter target funding date"/>

            </Form.Group>
            <Form.Group as={Col} controId="formDescription">
               
                <Form.Control type="name"
                //value={state.foodItems}
                onChange={e => state.description = e.target.value}
                placeholder="Enter description"/>

            </Form.Group>
            <Form.Group as={Col} controId="formCategories">
               
                <Form.Control type="name"
                //value={state.foodItems}
                onChange={e => state.categories = e.target.value}
                placeholder="Enter categories"/>

            </Form.Group>

            <Col xs="auto">
            <Button variant ="primary" type="submit" onClick={() => handleSumbit()}>
                Add Restaurant
            </Button>
            </Col>

            </Row>
        
        </Form>
    </div>
  )
}

export default AddProject