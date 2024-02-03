import {
  Box,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { toAddress } from '@liteflow/core'
import { CreateNftStep, useCreateNFT } from '@liteflow/react'
import useTranslation from 'next-translate/useTranslation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Standard } from '../../../graphql'
import useBlockExplorer from '../../../hooks/useBlockExplorer'
import useEnvironment from '../../../hooks/useEnvironment'
import useSigner from '../../../hooks/useSigner'
import { mediaTypeObject, values as traits } from '../../../traits'
import { formatError } from '../../../utils'
import ConnectButtonWithNetworkSwitch from '../../Button/ConnectWithNetworkSwitch'
import Dropzone from '../../Dropzone/Dropzone'
import CreateCollectibleModal from '../../Modal/CreateCollectible'
import Select from '../../Select/Select'

export type FormData = {
  name: string
  description: string
  royalties: string
  category: string
  amount: string
  content: File | undefined
  preview: File | undefined
  isAnimation: boolean
  copyright: boolean
  licenseType: string
  mediaType: string
  licenseDuration: string
  usageRestrictions: string
  assetPreview: string
  actualAsset: string
}

type Props = {
  collection: {
    chainId: number
    address: string
    standard: Standard
  }
  onCreated: (id: string) => void
  onInputChange: (data: Partial<FormData>) => void
}

const TokenFormCreate: FC<Props> = ({
  collection,
  onCreated,
  onInputChange,
}) => {
  const { t } = useTranslation('components')
  const { LAZYMINT, MAX_ROYALTIES } = useEnvironment()
  const toast = useToast()
  const signer = useSigner()
  const blockExplorer = useBlockExplorer(collection.chainId)
  const {
    isOpen: createCollectibleIsOpen,
    onOpen: createCollectibleOnOpen,
    onClose: createCollectibleOnClose,
  } = useDisclosure()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      description: '',
      royalties: '0',
    },
  })
  const res = useWatch({ control })
  useEffect(() => onInputChange(res), [res, onInputChange])
  const [selectedMediaType, setSelectedMediaType] = useState('');

  // const [transform] = useFileTransformer()
  const [createNFT, { activeStep, transactionHash }] = useCreateNFT(signer)

  const mediaType = useMemo(
    () => (traits['MediaType'] || []).map((x) => ({ id: x.mediaType, title: x.mediaType })) || [],
    [],
  )

  const licenseType = useMemo(
    () => (traits['LicenseType'] || []).map((x) => ({ id: x, title: x })) || [],
    [],
  )

  const handleFileDrop = (file: File) => {
    if (!file) return
    setValue('isAnimation', file.type.startsWith('video/'))
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!data.content) throw new Error('content falsy')

    try {
      createCollectibleOnOpen()
      if (parseFloat(data.royalties) > MAX_ROYALTIES)
        throw new Error('Royalties too high')
      const assetId = await createNFT(
        {
          chain: collection.chainId,
          collection: toAddress(collection.address),
          supply: collection.standard === 'ERC1155' ? parseInt(data.amount) : 1,
          royalties: parseFloat(data.royalties),
          metadata: {
            name: data.name,
            description: data.description,
            attributes: [
              { traitType: 'Media Type', value: data.mediaType },
              { traitType: 'License Type', value: data.licenseType },
              { traitType: 'License Duration', value: data.licenseDuration },
              { traitType: 'Usage Restrictions', value: data.usageRestrictions },
              { traitType: 'Unlockable Content Preview', value: data.assetPreview },
              { traitType: 'Unlockable Content', value: data.actualAsset },
            ],
            media: {
              content: data.content,
              preview: data.preview,
              isAnimation: data.isAnimation,
              isPrivate: false,
            },
          },
        },
        LAZYMINT,
      )

      onCreated(assetId)
    } catch (e) {
      toast({
        title: formatError(e),
        status: 'error',
      })
    } finally {
      createCollectibleOnClose()
    }
  })

  // TODO: activate this again when we want to reactivate the automatic blur with useFileTransformer()
  // useEffect(() => {
  //   if (!res.content) {
  //     setValue('preview', undefined)
  //     return
  //   }
  //   if (!res.isPrivate || res.isAnimation) return
  //   void transform(res.content).then((file) => {
  //     setValue('preview', file)
  //   })
  //   return () => {
  //     setValue('preview', undefined)
  //   }
  // }, [res.content, res.isAnimation, res.isPrivate, transform, setValue])

  return (
    <Stack
      align="flex-start"
      spacing={12}
      as="form"
      onSubmit={onSubmit}
      flex="1 1 0%"
    >
      <Dropzone
        label={t('token.form.create.file.label')}
        heading={t('token.form.create.file.heading')}
        hint={t('token.form.create.file.hint')}
        name="content"
        acceptTypes={{
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          'video/*': ['.mp4', '.webm'],
        }}
        maxSize={100000000} // 100 MB
        required
        control={control}
        error={errors.content}
        onChange={(e) => handleFileDrop(e as unknown as File)}
        value={res.content as any}
        context={{
          replace: t('token.form.create.file.file.replace'),
          chose: t('token.form.create.file.file.chose'),
        }}
      />
      {res.isAnimation && (
        <Dropzone
          label={t('token.form.create.preview.label')}
          heading={t('token.form.create.preview.heading')}
          hint={t('token.form.create.preview.hint')}
          name="preview"
          acceptTypes={{
            'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          }}
          maxSize={100000000} // 100 MB
          required
          control={control}
          error={errors.preview}
          value={res.preview as any}
          context={{
            replace: t('token.form.create.preview.file.replace'),
            chose: t('token.form.create.preview.file.chose'),
          }}
        />
      )}
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">
          {t('token.form.create.name.label')}
        </FormLabel>
        <Input
          id="name"
          placeholder={t('token.form.create.name.placeholder')}
          {...register('name', {
            required: t('token.form.create.validation.required'),
          })}
          borderColor="rytuGreen.100"
          boxShadow="none !important"
          css={{
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        />
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <HStack spacing={1} mb={2}>
          <FormLabel htmlFor="description" m={0}>
            {t('token.form.create.description.label')}
          </FormLabel>
          <FormHelperText m={0}>
            {t('token.form.create.description.info')}
          </FormHelperText>
        </HStack>
        <Textarea
          id="description"
          placeholder={t('token.form.create.description.placeholder')}
          {...register('description')}
          rows={5}
          borderColor="rytuGreen.100"
          boxShadow="none !important"
          css={{
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        />
      </FormControl>
      {collection.standard === 'ERC1155' && (
        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">
            {t('token.form.create.amount.label')}
          </FormLabel>
          <InputGroup>
            <NumberInput
              clampValueOnBlur={false}
              min={1}
              allowMouseWheel
              w="full"
              onChange={(x) => setValue('amount', x)}
            >
              <NumberInputField
                id="amount"
                placeholder={t('token.form.create.amount.placeholder')}
                {...register('amount', {
                  required: t('token.form.create.validation.required'),
                  validate: (value) => {
                    if (parseFloat(value) < 1) {
                      return t('token.form.create.validation.positive')
                    }
                    if (!/^\d+$/.test(value)) {
                      return t('token.form.create.validation.integer')
                    }
                  },
                })}
                borderColor="rytuGreen.100"
                boxShadow="none !important"
                css={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          {errors.amount && (
            <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
      <FormControl isInvalid={!!errors.royalties}>
        <HStack spacing={1} mb={2}>
          <FormLabel htmlFor="royalties" m={0}>
            {t('token.form.create.royalties.label')}
          </FormLabel>
          <FormHelperText m={0}>
            {t('token.form.create.royalties.info')}
          </FormHelperText>
        </HStack>
        <InputGroup>
          <NumberInput
            clampValueOnBlur={false}
            min={0}
            max={MAX_ROYALTIES}
            step={0.01}
            allowMouseWheel
            w="full"
            onChange={(x) => setValue('royalties', x)}
          >
            <NumberInputField
              id="royalties"
              placeholder={t('token.form.create.royalties.placeholder')}
              {...register('royalties', {
                validate: (value) => {
                  if (
                    parseFloat(value) < 0 ||
                    parseFloat(value) > MAX_ROYALTIES
                  ) {
                    return t('token.form.create.validation.in-range', {
                      max: MAX_ROYALTIES,
                    })
                  }

                  const nbDecimals = value.split('.')[1]?.length || 0
                  if (nbDecimals > 2) {
                    return t('token.form.create.validation.decimals', {
                      nbDecimals: 2,
                    })
                  }
                },
              })}
              borderColor="rytuGreen.100"
              boxShadow="none !important"
              css={{
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-visible': {
                  outline: 'none',
                  boxShadow: 'none',
                },
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <InputRightElement mr={6} pointerEvents="none">
            %
          </InputRightElement>
        </InputGroup>
        {errors.royalties && (
          <FormErrorMessage>{errors.royalties.message}</FormErrorMessage>
        )}
      </FormControl>
      
      <Select
        label={t('token.form.create.mediaType.label')}
        name="mediaType"
        control={control}
        placeholder={t('token.form.create.mediaType.placeholder')}
        choices={mediaType.map((x) => ({
          value: x.id,
          label: x.title,
        }))}
        value={res.mediaType}
        onChange={(x) => setSelectedMediaType(`${x}`)}
        required
        error={errors.mediaType}
      />

      {selectedMediaType && 
      <Flex
        padding="10px 15px"
        backgroundColor="#eeeeeea1"
        borderRadius="10px"
        mt="-35px"
        color="brand.black"
        gap="10px"
      >
        <Box fontWeight="600">
        {selectedMediaType}:
        </Box>
        {mediaTypeObject[selectedMediaType]}
      </Flex>}


      <Select
        label={t('token.form.create.licenseType.label')}
        name="licenseType"
        control={control}
        placeholder={t('token.form.create.licenseType.placeholder')}
        choices={licenseType.map((x) => ({
          value: x.id,
          label: x.title,
        }))}
        value={res.licenseType}
        required
        error={errors.licenseType}
      />

      <FormControl isInvalid={!!errors.licenseDuration}>
          <HStack spacing={1} mb={2}>
            <FormLabel htmlFor="licenseDuration" m={0}>
              {t('token.form.create.licenseDuration.label')}
            </FormLabel>
            <FormHelperText m={0}>
              {t('token.form.create.licenseDuration.info')}
            </FormHelperText>
          </HStack>
          <InputGroup>
            <NumberInput
              clampValueOnBlur={false}
              min={1}
              allowMouseWheel
              w="full"
              onChange={(x) => setValue('licenseDuration', x)}
            >
              <NumberInputField
                id="licenseDuration"
                placeholder={t('token.form.create.licenseDuration.placeholder')}
                {...register('licenseDuration', {
                  required: t('token.form.create.validation.required'),
                  validate: (value) => {
                    if (parseFloat(value) < 1) {
                      return t('token.form.create.validation.positive')
                    }
                    if (!/^\d+$/.test(value)) {
                      return t('token.form.create.validation.integer')
                    }
                  },
                })}
                borderColor="rytuGreen.100"
                boxShadow="none !important"
                css={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          {errors.amount && (
            <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
          )}
      </FormControl>

      <FormControl>
        <HStack spacing={1} mb={2}>
          <FormLabel htmlFor="usageRestrictions" m={0}>
            {t('token.form.create.usageRestrictions.label')}
          </FormLabel>
          <FormHelperText m={0}>
            {t('token.form.create.usageRestrictions.info')}
          </FormHelperText>
        </HStack>
        <Textarea
          id="usageRestrictions"
          placeholder={t('token.form.create.usageRestrictions.placeholder')}
          {...register('usageRestrictions')}
          rows={5}
          borderColor="rytuGreen.100"
          boxShadow="none !important"
          css={{
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        />
      </FormControl>

      {/* <Divider></Divider> */}

      <FormControl isInvalid={!!errors.assetPreview}>
        <FormLabel htmlFor="assetPreview">
          {t('token.form.create.assetPreview.label')}
        </FormLabel>
        <Input
          id="assetPreview"
          placeholder={t('token.form.create.assetPreview.placeholder')}
          {...register('assetPreview')}
          borderColor="rytuGreen.100"
          boxShadow="none !important"
          css={{
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        />
        {errors.name && (
          <FormErrorMessage>{errors.assetPreview?.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.actualAsset}>
        <FormLabel htmlFor="actualAsset">
          {t('token.form.create.actualAsset.label')}
        </FormLabel>
        <Input
          id="actualAsset"
          placeholder={t('token.form.create.actualAsset.placeholder')}
          {...register('actualAsset', {
            required: t('token.form.create.validation.required'),
          })}
          borderColor="rytuGreen.100"
          boxShadow="none !important"
          css={{
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        />
        {errors.name && (
          <FormErrorMessage>{errors.actualAsset?.message}</FormErrorMessage>
        )}
      </FormControl>

      {/* <Dropzone
        label={t('token.form.create.assetPreview.label')}
        heading={t('token.form.create.assetPreview.heading')}
        hint={t('token.form.create.assetPreview.hint')}
        name="assetPreview"
        acceptTypes={{
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          'video/*': ['.mp4', '.webm'],
          'audio/*': ['.mp3', '.wav'],
          'application/*': ['.pdf', '.doc', '.docx'],
        }}
        maxSize={100000000} // 100 MB
        required
        control={control}
        error={errors.assetPreview}
        onChange={(e) => handleFileDrop(e as unknown as File)}
        value={res.assetPreview as any}
        context={{
          replace: t('token.form.create.assetPreview.file.replace'),
          chose: t('token.form.create.assetPreview.file.chose'),
        }}
      /> */}

      {/* <Dropzone
        label={t('token.form.create.actualAsset.label')}
        heading={t('token.form.create.actualAsset.heading')}
        hint={t('token.form.create.actualAsset.hint')}
        name="actualAsset"
        acceptTypes={{
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          'video/*': ['.mp4', '.webm'],
          'audio/*': ['.mp3', '.wav'],
          'application/*': ['.pdf', '.doc', '.docx'],
        }}
        maxSize={100000000} // 100 MB
        required
        control={control}
        error={errors.actualAsset}
        onChange={(e) => handleFileDrop(e as unknown as File)}
        value={res.actualAsset as any}
        context={{
          replace: t('token.form.create.actualAsset.file.replace'),
          chose: t('token.form.create.actualAsset.file.chose'),
        }}
      /> */}

      {/* <Divider></Divider> */}

      <Stack>
        <FormControl isInvalid={!!errors.copyright}>
          <Checkbox
            id="copyright"
            {...register('copyright', { required: 'Title is required' })}
            borderColor="rytuGreen.100"
          >
            I confirm that I am the copyright holder
          </Checkbox>
          {errors.copyright && (
            <FormErrorMessage>{errors.copyright.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.copyright}>
          <Checkbox
            id="copyright"
            {...register('copyright', { required: 'Title is required' })}
            borderColor="rytuGreen.100"
          >
            By continuing, I certify that I am 18 years of age, and I agree to the 
              &nbsp;
              <Link color="rytuRed.50">Terms of Use</Link> and  
              &nbsp;
              <Link color="rytuRed.50">Privacy Policy</Link>.
          </Checkbox>
          {errors.copyright && (
            <FormErrorMessage>{errors.copyright.message}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>


      <ConnectButtonWithNetworkSwitch
        chainId={collection.chainId}
        isLoading={activeStep !== CreateNftStep.INITIAL}
        type="submit"
        disabled={!isValid}
      >
        <Text as="span" isTruncated>
          {t('token.form.create.submit')}
        </Text>
      </ConnectButtonWithNetworkSwitch>
      <CreateCollectibleModal
        isOpen={createCollectibleIsOpen}
        onClose={createCollectibleOnClose}
        title={t('token.form.create.title')}
        step={activeStep}
        blockExplorer={blockExplorer}
        transactionHash={transactionHash}
        isLazyMint={LAZYMINT}
      />
    </Stack>
  )
}

export default TokenFormCreate
