import {
  Box,
  Flex,
  FormLabel,
  Button,
  Input,
  Heading,
  UnorderedList,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../lib/prisma';
import toast, { Toaster } from 'react-hot-toast';

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
    email: string;
  }[];
}

interface FormData {
  title: string;
  content: string;
  id: string;
  email: string;
}

const Dashboard = ({ notes }: Notes) => {
  const [form, setForm] = useState<FormData>({
    title: '',
    content: '',
    id: '',
    email: '',
  });

  const createNotify = () => toast.success('Successfully Created!');
  const updateNotify = () => toast.success('Successfully Updated!');

  // Phone number Validation
  const handleChange = (e: { target: { value: string } }) => {
    setForm({ ...form, content: e.target.value });
    const content = e.target.value.replace(/\D/g, '');
    setForm({ ...form, content });
  };

  const handleCancel = () => {
    setForm({ title: '', content: '', email: '', id: '' });
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        if (data.id) {
          refreshData();
          deleteNote(data.id);
          setForm({ title: '', content: '', email: '', id: '' });
        } else {
          refreshData();
          setForm({ title: '', content: '', email: '', id: '' });
          createNotify();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData();
        updateNotify();
      });
    } catch (error) {
      console.log(error);
    }
  }

  // async function updateNote(id: string) {
  //   try {
  //     fetch(`http://localhost:3000/api/note/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         title: form.title,
  //         content: form.content,
  //         email: form.email,
  //       }),
  //     }).then((res) => {
  //       if (res.ok) {
  //         console.log('OK');
  //       } else {
  //         console.log('not ok');
  //       }
  //       refreshData();
  //       updateNotify();
  //       // deleteNotify();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction={['column', 'column', 'row']}>
      <Box
        maxW='960px'
        w={['100%', '100%', '70%', '40%']}
        bg='#0F172A'
        height={['70vh', '70vh', 'auto', '100vh']}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          className='w-auto min-w-[80%] max-w-min mx-auto flex flex-col items-stretch mt-12 bg-slate-900'
        >
          <Heading as='h1' size='xl' color='white' mb='2'>
            Add Contact
          </Heading>
          <FormLabel color='white' mt='5'>
            Name:
          </FormLabel>
          <Input
            size='lg'
            bg='#FFFFFF'
            mb='5'
            type='text'
            placeholder='Name'
            name='name'
            id='name'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required={true}
          />
          <FormLabel htmlFor='email' color='white'>
            Email:
          </FormLabel>
          <Input
            size='lg'
            bg='#FFFFFF'
            mb='5'
            type='email'
            placeholder='Email Address'
            name='email'
            id='email'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required={true}
          />
          <FormLabel htmlFor='phone' color='white'>
            Phone:
          </FormLabel>
          <Input
            size='lg'
            bg='#FFFFFF'
            mb='10'
            type='text'
            placeholder='Phone Number'
            name='phone'
            id='phone'
            value={form.content}
            onChange={handleChange}
            required={true}
          />
          <Button colorScheme='teal' size='lg' mb='5' type='submit'>
            Submit
          </Button>
          <Toaster />
          <Button
            colorScheme='teal'
            size='lg'
            type='reset'
            onClick={handleCancel}
            mb='5'
          >
            Cancel
          </Button>
        </form>
      </Box>
      <Box w='100%'>
        <Heading as='h1' size='xl' mt='12' mb='5' ml='4'>
          Contacts
        </Heading>
        <UnorderedList listStyleType='none'>
          {notes.map((note) => (
            <ListItem
              key={note.id}
              border='1px'
              borderColor='gray.300'
              p='3'
              my='2'
              me='3'
              borderRadius='lg'
            >
              <Flex direction={['column', 'row']}>
                <Box flex='1'>
                  <Heading as='h1' size='lg' mb='1'>
                    {note.title}
                  </Heading>
                  <Text fontSize='md' mb='1'>
                    {note.email}
                  </Text>
                  <Text fontSize='sm'>{note.content}</Text>
                </Box>
                <Box alignSelf={['flex-start', 'center']} mt={['3', '0']}>
                  <Button
                    onClick={() =>
                      setForm({
                        title: note.title,
                        content: note.content,
                        email: note.email,
                        id: note.id,
                      })
                    }
                    m='auto'
                    bg='#0D6EFD'
                    colorScheme='messenger'
                    color='white'
                    mr='3'
                    fontWeight='normal'
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => deleteNote(note.id)}
                    m='auto'
                    colorScheme='red'
                    color='white'
                    mr='3'
                    fontWeight='normal'
                  >
                    Delete
                  </Button>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true,
      email: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};
