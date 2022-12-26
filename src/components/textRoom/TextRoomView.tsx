import { Box, Flex, ScrollArea } from "@mantine/core";
import { IconHash } from "@tabler/icons";
import { useRouter } from "next/router";
import { PostInput } from "~/components/textRoom/PostInput";
import { useTextRoomStore } from "~/stores/textRoomStore";
import { PostHeader } from "../../pages/discussion/[channelId]";
import { ChannelHeader } from "../common/ChannelHeader";
import { PostList } from "./PostList";
import { PostWithReplies } from "./PostWithReplies";

export const TextRoomView = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const channelId = router.query.channelId as string;

  const posts = useTextRoomStore((s) => s.posts);
  const selectedPost = posts.find((p) => p.id === postId);

  return (
    <Flex h="100%" bg="gray.0">
      <Box h="100%" sx={{ flex: 1 }}>
        <ChannelHeader bg="gray.0" title={channelId} icon={<IconHash />} />
        <Flex h="calc(100% - 60px)" direction="column">
          <Flex align="center" justify="center" h="0" sx={{ flex: 1 }}>
            <PostList focusPost={selectedPost?.id} />
          </Flex>
          <PostInput />
        </Flex>
      </Box>
      {selectedPost && (
        <Box
          h="100%"
          w="400px"
          sx={{
            borderLeft: "1px solid #eaeaea",
          }}
        >
          <PostHeader />
          <ScrollArea h="calc(100% - 60px)">
            <PostWithReplies post={selectedPost} />
          </ScrollArea>
        </Box>
      )}
    </Flex>
  );
};
