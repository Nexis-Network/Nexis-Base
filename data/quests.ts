export const integrationCategories = [
  "general",
  "protocols",
  "services",
] as const

interface TurboIntegration {
  name: string
  href: string
  url: string
  description: string
  imgLight: string
  imgDark: string
  category: (typeof integrationCategories)[number]
}

export const quest_tasks = {
  follow_twitter: {
    name: "Follow @Nexis_Network on Twitter",
    href: "follow_twitter",
    url: "https://x.com/nexis_network",
    description: "Stay up-to-date with the latest news, announcements, and updates by following our official Twitter account!",
    imgLight: "/assets/quests/twitter_follow_light.png",
    imgDark: "/assets/quests/twitter_follow_dark.png",
    category: "social",
  },
  join_discord: {
    name: "Join our Discord Server",
    href: "join_discord",
    url: "https://discord.gg/v4nM2JxGBd",
    description: "Meet the community, ask questions, and engage in discussions on our Discord server. Be part of the future of blockchain!",
    imgLight: "/assets/quests/discord_join_light.png",
    imgDark: "/assets/quests/discord_join_dark.png",
    category: "social",
  },
  join_telegram: {
    name: "Join our Telegram Group",
    href: "join_telegram",
    url: "https://t.me/Nexis_Network",
    description: "Connect with other members and stay informed about Nexis Network developments through our official Telegram channel.",
    imgLight: "/assets/quests/telegram_join_light.png",
    imgDark: "/assets/quests/telegram_join_dark.png",
    category: "social",
  },
  retweet_announcement: {
    name: "Retweet the Latest Announcement",
    href: "retweet_announcement",
    url: "https://x.com/nexis_network",
    description: "Spread the word! Retweet our latest announcement to help us grow and earn points.",
    imgLight: "/assets/quests/retweet_light.png",
    imgDark: "/assets/quests/retweet_dark.png",
    category: "social",
  },
  make_transaction: {
    name: "Make a Transaction",
    href: "make_transaction",
    url: "https://nexis.network",
    description: "Interact with the Nexis blockchain! Complete a transaction and experience our fast, secure platform.",
    imgLight: "/assets/quests/transaction_light.png",
    imgDark: "/assets/quests/transaction_dark.png",
    category: "onchain",
  },
  deploy_smart_contract: {
    name: "Deploy Your First Smart Contract",
    href: "deploy_smart_contract",
    url: "https://nexis.network",
    description: "Get hands-on with our blockchain! Deploy a simple smart contract to earn points.",
    imgLight: "/assets/quests/smart_contract_light.png",
    imgDark: "/assets/quests/smart_contract_dark.png",
    category: "onchain",
  },
  write_blog: {
    name: "Create a Blog Post or Thread About Nexis",
    href: "write_blog",
    url: "https://blog.nexis.network",
    description: "Share your experience with Nexis Network. Write a blog post or Twitter thread to earn points!",
    imgLight: "/assets/quests/blog_light.png",
    imgDark: "/assets/quests/blog_dark.png",
    category: "build",
  },
  contribute_github: {
    name: "Contribute on GitHub",
    href: "contribute_github",
    url: "https://github.com/nexis-network",
    description: "Help improve the network! Submit an issue or open a pull request on our GitHub repository.",
    imgLight: "/assets/quests/github_light.png",
    imgDark: "/assets/quests/github_dark.png",
    category: "build",
  },
  invite_friend: {
    name: "Invite a Friend",
    href: "invite_friend",
    url: "https://discord.gg/v4nM2JxGBd",
    description: "Help us grow! Invite a friend to join our Discord or Telegram, and earn points when they join.",
    imgLight: "/assets/quests/invite_light.png",
    imgDark: "/assets/quests/invite_dark.png",
    category: "refer",
  },
  engage_medium: {
    name: "Engage with Our Blog",
    href: "engage_medium",
    url: "https://blog.nexis.network",
    description: "Comment on or share a blog post from our official Medium page.",
    imgLight: "/assets/quests/medium_light.png",
    imgDark: "/assets/quests/medium_dark.png",
    category: "social",
  },
  submit_feedback: {
    name: "Submit Network Feedback",
    href: "submit_feedback",
    url: "https://nexis.network/feedback",
    description: "Help us improve! Submit feedback about your experience using Nexis Network.",
    imgLight: "/assets/quests/feedback_light.png",
    imgDark: "/assets/quests/feedback_dark.png",
    category: "build",
  },
  participate_vote: {
    name: "Join a Governance Vote",
    href: "participate_vote",
    url: "https://nexis.network/governance",
    description: "Participate in a governance voting event to make your voice heard and earn points.",
    imgLight: "/assets/quests/vote_light.png",
    imgDark: "/assets/quests/vote_dark.png",
    category: "onchain",
  },
} as const
