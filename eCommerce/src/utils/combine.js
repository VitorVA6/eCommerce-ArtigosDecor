const combine = ([head, ...[headTail, ...tailTail]]) => {
    if (!headTail) return head
  
    const combined = headTail.reduce((acc, x) => {
      return acc.concat(head.map(h => `${h} ${x}`))
    }, [])
  
    return combine([combined, ...tailTail])
  }

export default combine