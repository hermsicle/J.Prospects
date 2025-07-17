import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Box, InputGroup, Input, Table, IconButton } from '@chakra-ui/react';

import { CiSearch } from 'react-icons/ci';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import { useMemo, useState } from 'react';
import { useColorModeValue } from '../ui/color-mode';
import { Link } from 'react-router-dom';

export function AppTable({ columns, rawData = [] }: any) {
  const [search, setSearch] = useState('');

  // Filter data based on search query (case insensitive)
  const data = useMemo(() => {
    if (!search) return rawData;
    return rawData.filter((row: any) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box>
      {/* Search bar */}
      <InputGroup
        mb={4}
        maxW="400px"
        mx="auto"
        startElement={<CiSearch color="gray.400" />}
      >
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search table"
          bg="gray.50"
          _dark={{ bg: 'gray.700' }}
          rounded="md"
          // boxShadow="sm"
          _focus={{ boxShadow: 'outline' }}
        />
      </InputGroup>
      <Table.ScrollArea
        borderWidth="1px"
        rounded="md"
        // height="500px"
        maxW="100%"
      >
        <Table.Root variant={'outline'} showColumnBorder stickyHeader>
          <Table.Header bg={useColorModeValue('gray.100', '')}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Cell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // if cell col id is actions
                  if (cell.column.id === 'actions') {
                    return (
                      <Table.Cell key={cell.id}>
                        <IconButton variant={'ghost'} size="sm">
                          <FaRegEdit color="green" />
                        </IconButton>
                        <IconButton variant={'ghost'} size="sm">
                          <FaRegTrashAlt color="red" />
                        </IconButton>
                      </Table.Cell>
                    );
                  }

                  // if cell col id is companyName
                  if (cell.column.id === 'companyName') {
                    return (
                      <Table.Cell key={cell.id} whiteSpace="nowrap">
                        <Link
                          to={`/companies/company/${cell.renderValue()}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Box
                            as="span"
                            color="blue.500"
                            textDecoration="underline"
                            cursor="pointer"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Box>
                        </Link>
                      </Table.Cell>
                    );
                  }

                  return (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
}
