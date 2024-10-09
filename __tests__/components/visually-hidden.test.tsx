import {render} from '@testing-library/react'
import {VisuallyHidden} from '@/components/ui/visually-hidden'

describe('VisuallyHidden component', function () {
  it('renders correctly', function () {
    render(<VisuallyHidden />)
  })
})
