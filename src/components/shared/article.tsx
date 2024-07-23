import {cn} from '#/lib/utils'

function Article({className, ...props}: React.ComponentPropsWithoutRef<'article'>) {
  return (
    <article 
      className={cn(
        'space-y-4', 
        className
      )} 
      {...props}
    />
  )
}

Article.displayName = 'Article'

export {Article}