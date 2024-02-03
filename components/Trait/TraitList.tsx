import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'components/Link/Link'
import useTranslation from 'next-translate/useTranslation'
import { FC, useCallback, useEffect } from 'react'

type TraitListProps = {
  asset: {
    collection: {
      address: string
      chainId: number
      supply: number
    }
  }
  traits: {
    type: string
    value: string
    collectionTraitValue: {
      numberOfAssets: number
    } | null
  }[]
  isOwner: boolean
}

const TraitList: FC<TraitListProps> = ({
  asset: {
    collection: { address, chainId, supply },
  },
  traits,
  isOwner
}) => {
  useEffect(() => {
    console.log('xxx1', traits, isOwner);
  }, [traits, isOwner]);

  const { t } = useTranslation('components')
  const href = useCallback(
    (type: string, value: string) =>
      `/collection/${chainId}/${address}?traits[${type}]=${value}`,
    [chainId, address],
  )
  const getPercentage = useCallback(
    (numberOfAssets: number | undefined) =>
      (((numberOfAssets || 0) / supply) * 100).toFixed(2),
    [supply],
  )

  return (
    <SimpleGrid columns={{ base: 2, sm: 3 }} gap={3}>
      {traits.map((trait, i) => (
        <Flex
          as={Link}
          href={href(trait.type, trait.value)}
          key={i}
          flexDirection="column"
          rounded="xl"
          border="1px"
          borderColor="rytuGreen.100"
          p={3}
        >
          
          <Text
            as="span"
            variant="caption"
            color="gray.500"
            title={trait.type}
            isTruncated
            pb={1}
          >
            {trait.type}
          </Text>
         
          {(trait.type == "Unlockable Content" && !isOwner ? 
          <Text
            as="span"
            variant="subtitle2"
            color="rytuRed.50"
          >
            Get NFT to Unlock Content 
          </Text> : 
            <Text
              as="span"
              variant="subtitle2"
              color={trait.type == "Unlockable Content"? "rytuRed.50": "brand.black"}
              title={trait.value}
              isTruncated
            >
              <Link href={trait.value}>
                  {trait.value}
              </Link>
            </Text>
          )}

          <Text
            as="span"
            variant="caption"
            color="brand.black"
            title={t('traits.percent', {
              value: getPercentage(trait.collectionTraitValue?.numberOfAssets),
            })}
            isTruncated
          >
            {t('traits.percent', {
              value: getPercentage(trait.collectionTraitValue?.numberOfAssets),
            })}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  )
}

export default TraitList
