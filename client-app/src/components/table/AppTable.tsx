import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Box,
  InputGroup,
  Input,
  Table,
  IconButton,
  Flex,
  Badge,
  Icon,
} from '@chakra-ui/react';

import { CiSearch } from 'react-icons/ci';
import { FaRegEdit, FaRegTrashAlt, FaSort } from 'react-icons/fa';

import { useMemo, useState } from 'react';
import { useColorModeValue } from '../ui/color-mode';
import { Link } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';

export function AppTable({
  columns,
  rawData = [],
  handleDelete = null,
  handleEdit = null,
  deleteActionOnly = false,
  handleRefresh = () => {},
}: any) {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<any>([]);

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
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting,
    initialState: {
      sorting,
    },
    state: {
      sorting,
    },
  });

  return (
    <Box>
      <Flex alignItems="center" justifyContent={'space-between'} mb={4}>
        {/* Search bar */}
        <InputGroup
          maxW="400px"
          mx=""
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
            _focus={{ boxShadow: 'outline' }}
          />
        </InputGroup>

        {/* Refresh data */}
        <IconButton size="sm" variant={'subtle'} onClick={handleRefresh}>
          <FiRefreshCcw />
        </IconButton>
      </Flex>

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
                  <Table.Cell key={header.id} fontWeight={'500'}>
                    <Box
                      style={{
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <Icon color="blue.500">
                          <FaSort />
                        </Icon>
                      )}
                    </Box>
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
                    if (deleteActionOnly) {
                      return (
                        <Table.Cell key={cell.id}>
                          <IconButton
                            variant={'ghost'}
                            size="sm"
                            onClick={() => handleDelete(row.original)}
                          >
                            <FaRegTrashAlt color="red" />
                          </IconButton>
                        </Table.Cell>
                      );
                    }

                    return (
                      <Table.Cell key={cell.id}>
                        <IconButton
                          variant={'ghost'}
                          size="sm"
                          onClick={() => handleEdit(row.original)}
                        >
                          <FaRegEdit color="green" />
                        </IconButton>
                        <IconButton
                          variant={'ghost'}
                          size="sm"
                          onClick={() => handleDelete(row.original)}
                        >
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
                          to={`/companies/company/${cell.renderValue()}?id=${
                            (row.original as { companyId?: string })?.companyId
                          }`}
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

                  // if cell col id is status
                  if (cell.column.id === 'status') {
                    interface RowData {
                      status?: string;
                      // Add other properties that row.original may have
                    }

                    const status =
                      (row.original as RowData)?.status || 'Unknown';
                    const statusColor =
                      status.toLowerCase() === 'applied'
                        ? 'blue.500'
                        : status.toLowerCase() === 'interviewing'
                        ? 'orange.500'
                        : status.toLowerCase() === 'offer'
                        ? 'green.500'
                        : status.toLowerCase() === 'rejected'
                        ? 'red.500'
                        : 'gray.500';

                    return (
                      <Table.Cell key={cell.id}>
                        <Badge
                          as="span"
                          color={statusColor}
                          fontWeight="600"
                          textTransform="capitalize"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Badge>
                      </Table.Cell>
                    );
                  }

                  if (
                    cell.column.id === 'createdAt' ||
                    cell.column.id === 'updatedAt'
                  ) {
                    return (
                      <Table.Cell key={cell.id}>
                        {new Date(cell.getValue() as string).toLocaleString(
                          'en-US',
                          {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true, // Use 12-hour format
                          }
                        )}
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
