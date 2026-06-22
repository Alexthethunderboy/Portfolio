import React, { useCallback, useState } from 'react';
import { StringInputProps, useFormValue, useClient } from 'sanity';
import { Stack, Button, Text, Box } from '@sanity/ui';

export function LiveUrlWithOgImageInput(props: StringInputProps) {
  const [isFetching, setIsFetching] = useState(false);
  const client = useClient({ apiVersion: '2024-06-22' });

  const liveUrl = props.value;
  const documentId = useFormValue(['_id']) as string;

  const fetchThumbnail = useCallback(async () => {
    if (!liveUrl) {
      alert("Please enter a URL first.");
      return;
    }
    if (!documentId) {
      alert("Please save the document first before fetching the thumbnail.");
      return;
    }

    try {
      setIsFetching(true);
      
      const response = await fetch(`/api/og-image?url=${encodeURIComponent(liveUrl)}`);
      
      if (!response.ok) {
        let errorMsg = "Failed to fetch OG image.";
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch (e) {}
        alert(errorMsg);
        return;
      }

      const blob = await response.blob();
      
      const asset = await client.assets.upload('image', blob, {
        filename: 'og-image',
      });

      // Patch the current document's thumbnail field
      await client
        .patch(documentId)
        .set({
          thumbnail: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();

      alert("Successfully fetched and updated the thumbnail!");

    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching the thumbnail.");
    } finally {
      setIsFetching(false);
    }
  }, [liveUrl, documentId, client]);

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Button 
        mode="ghost" 
        text={isFetching ? "Fetching Thumbnail..." : "Fetch Thumbnail from URL"} 
        onClick={fetchThumbnail}
        disabled={isFetching || !liveUrl}
      />
      <Box paddingX={1}>
        <Text size={1} muted>
          Clicking this will fetch the site&apos;s Open Graph image and set it as the project&apos;s thumbnail.
        </Text>
      </Box>
    </Stack>
  );
}
