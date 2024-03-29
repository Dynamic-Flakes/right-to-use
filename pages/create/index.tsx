import {
  Box,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HiExclamationCircle } from '@react-icons/all-files/hi/HiExclamationCircle'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React from 'react'
import Empty from '../../components/Empty/Empty'
import Head from '../../components/Head'
import Image from '../../components/Image/Image'
import Link from '../../components/Link/Link'
import BackButton from '../../components/Navbar/BackButton'
import { useFetchCollectionsForMintQuery } from '../../graphql'
import SmallLayout from '../../layouts/small'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SmallLayout>
    <Head
      title="Create an NFT"
      description="Create your NFT securely stored on blockchain"
    />
    {children}
  </SmallLayout>
)

const CreatePage: NextPage = () => {
  const { t } = useTranslation('templates')
  const { back } = useRouter()
  const { data } = useFetchCollectionsForMintQuery()

  const collections = data?.collections

  return (
    <Layout>
      <Flex 
        backgroundColor="rytuGreen.50" 
        position="absolute" 
        top="0" 
        w="100vw" 
        minHeight={{ base: '44vh', sm: '54vh'}}
        left="0" 
        zIndex="-2"
      >
      </Flex>

      <BackButton onClick={back} />
      <Heading as="h1" variant="title" color="rytuRed.50" mt={6}>
        {t('asset.typeSelector.title')}
      </Heading>
      <Text as="p" variant="text" 
        color="rytuGreen.200" 
        padding="10px"
        borderRadius="10px"
        backgroundColor="#ffffff3b"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
        textAlign="center"
        mt={3}>
        {t('asset.typeSelector.description')}
      </Text>
      <Flex
        mt={12}
        flexWrap="wrap"
        justify="center"
        align={{ base: 'center', md: 'inherit' }}
        gap={6}
      >
        {!collections ? (
          <>
            <Skeleton w={64} h={344} borderRadius="2xl" />
            <Skeleton w={64} h={344} borderRadius="2xl" />
          </>
        ) : collections.nodes.length === 0 ? (
          <Empty
            title={t('asset.typeSelector.empty.title')}
            description={t('asset.typeSelector.empty.description')}
            icon={
              <Icon as={HiExclamationCircle} w={8} h={8} color="gray.400" />
            }
          />
        ) : (
          collections.nodes.map(
            ({ address, chainId, standard, image, name }) => (
              <Link
                href={`/create/${chainId}/${address}`}
                key={`${chainId}/${address}`}
              >
                <Stack
                  w={64}
                  align="center"
                  spacing={8}
                  rounded="xl"
                  border="1px"
                  borderColor="rytuGreen.100"
                  borderStyle="solid"
                  bg="white"
                  p={12}
                  height="full"
                  shadow="sm"
                  _hover={{ shadow: 'md' }}
                  cursor="pointer"
                >
                  <Box
                    position="relative"
                    w={32}
                    h={32}
                    rounded="2xl"
                    overflow="hidden"
                    bg="gray.200"
                  >
                    {image && (
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="128px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                  <Box textAlign="center">
                    <Heading as="h3" variant="heading1" color="brand.black">
                      {name}
                    </Heading>
                    <Heading as="h5" variant="heading3" color="gray.500" mt={2}>
                      {standard === 'ERC721'
                        ? t('asset.typeSelector.single.type')
                        : t('asset.typeSelector.multiple.type')}
                    </Heading>
                  </Box>
                </Stack>
              </Link>
            ),
          )
        )}
      </Flex>
    </Layout>
  )
}

export default CreatePage
