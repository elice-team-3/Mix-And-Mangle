import type { Meta, StoryObj } from '@storybook/react'

import UserForm from './UserForm'

const meta = {
  title: 'UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserForm>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  decorators: [
    (Story) => (
      <div className="h-full min-h-full">
        <div className="fixed left-0 top-0 h-dvh w-dvw bg-gradient-to-t from-[#BEC0FF] to-white" />
        <div className="relative h-full">
          <Story />
        </div>
      </div>
    ),
  ],
}
