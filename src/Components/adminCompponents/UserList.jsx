import React, { useState } from 'react'
import { Button, Table } from "flowbite-react";
import AdminTopBarPage from './AdminTopBarPage';



function UserList() {
    //const [user,setUser] = useState(null);
  return <>
  <AdminTopBarPage />
     <div className="shadow-lg m-10">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>NO.</Table.HeadCell>
          <Table.HeadCell>EMAIL</Table.HeadCell>
          <Table.HeadCell>NAME</Table.HeadCell>
          <Table.HeadCell>PASSWORD</Table.HeadCell>
          <Table.HeadCell>ROLE</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">

            {/* {data.map((e,i)=>{
              <tr key={i} >


              </tr>
            })} */}
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
              1
            </Table.Cell>
              <Table.Cell>vignesh@gmail.com</Table.Cell>
              <Table.Cell>vignesh</Table.Cell>
              <Table.Cell>vignesh@123</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            <Table.Cell>
              <Button.Group>
                 <Button gradientDuoTone="greenToBlue" className='m-1'><a href="#">Edit</a></Button>
                 <Button gradientDuoTone="greenToBlue" className='m-1'><a href="#">Delete</a></Button>
                 <Button gradientDuoTone="greenToBlue" className='m-1'><a href="#">View</a></Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
    </div>
  </>
}

export default UserList